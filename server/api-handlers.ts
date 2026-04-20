import { deliveries, diagnosticMetrics, documents, objectives, team } from "../src/data/content";
import type { Locale } from "../src/i18n/copy";
import { badRequest, jsonResponse, methodNotAllowed, notFound, readJsonBody } from "./http";

const projectUpdatedAt = "2026-04-19T22:45:00-05:00";
const allowedLocales = new Set<Locale>(["es", "en"]);

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  source?: string;
  website?: string;
};

function getLocale(url: URL): Locale {
  const locale = url.searchParams.get("locale");
  return allowedLocales.has(locale as Locale) ? (locale as Locale) : "es";
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function localizedText(value: Record<Locale, string>, locale: Locale) {
  return value[locale] || value.es;
}

function createRequestId() {
  return `umo_${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`;
}

export function handleHealth(request: Request) {
  if (request.method !== "GET") return methodNotAllowed(["GET"]);

  return jsonResponse(
    {
      ok: true,
      service: "umo-global-dossier-api",
      status: "online",
      version: "0.1.0",
      updatedAt: projectUpdatedAt,
    },
    {
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}

export function handleProject(request: Request) {
  if (request.method !== "GET") return methodNotAllowed(["GET"]);

  const strongest = diagnosticMetrics
    .filter((metric) => metric.tone === "strong")
    .map((metric) => metric.label);
  const risks = diagnosticMetrics
    .filter((metric) => metric.tone === "risk")
    .map((metric) => metric.label);

  return jsonResponse(
    {
      ok: true,
      project: {
        name: "UMO Global Dossier",
        company: "UMO",
        market: "United States",
        route: "Medellin, Antioquia / ESIC -> United States",
        readiness: 40,
        updatedAt: projectUpdatedAt,
      },
      totals: {
        deliveries: deliveries.length,
        documents: documents.length,
        teamMembers: team.length,
        objectives: objectives.length,
      },
      diagnostic: {
        metrics: diagnosticMetrics,
        strongest,
        risks,
      },
    },
    {
      headers: {
        "cache-control": "s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}

export function handleDeliveries(request: Request) {
  if (request.method !== "GET") return methodNotAllowed(["GET"]);

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const tag = url.searchParams.get("tag");

  if (id) {
    const delivery = deliveries.find((item) => item.id === id);
    if (!delivery) return notFound(`Delivery '${id}' does not exist`);

    return jsonResponse(
      {
        ok: true,
        delivery,
      },
      {
        headers: {
          "cache-control": "s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  }

  const result = tag ? deliveries.filter((delivery) => delivery.tags.includes(tag)) : deliveries;
  return jsonResponse(
    {
      ok: true,
      count: result.length,
      deliveries: result,
    },
    {
      headers: {
        "cache-control": "s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}

export function handleSearch(request: Request) {
  if (request.method !== "GET") return methodNotAllowed(["GET"]);

  const url = new URL(request.url);
  const locale = getLocale(url);
  const query = normalize(url.searchParams.get("q")?.trim() ?? "");
  if (query.length < 2) {
    return badRequest("Search query must contain at least 2 characters.");
  }

  const matchedDeliveries = deliveries.filter((delivery) => {
    const haystack = [
      localizedText(delivery.title, locale),
      localizedText(delivery.summary, locale),
      localizedText(delivery.status, locale),
      delivery.tags.join(" "),
      ...delivery.modules.flatMap((module) => [
        localizedText(module.title, locale),
        localizedText(module.summary, locale),
        ...module.body.map((paragraph) => localizedText(paragraph, locale)),
        ...module.highlights.map((highlight) => localizedText(highlight, locale)),
      ]),
    ].join(" ");
    return normalize(haystack).includes(query);
  });

  const matchedDocuments = documents.filter((document) => {
    const haystack = [
      localizedText(document.title, locale),
      localizedText(document.description, locale),
      localizedText(document.category, locale),
      document.type,
    ].join(" ");
    return normalize(haystack).includes(query);
  });

  return jsonResponse(
    {
      ok: true,
      query,
      locale,
      results: {
        deliveries: matchedDeliveries,
        documents: matchedDocuments,
      },
    },
    {
      headers: {
        "cache-control": "s-maxage=30, stale-while-revalidate=120",
      },
    },
  );
}

export async function handleContact(request: Request) {
  if (request.method !== "POST") return methodNotAllowed(["POST"]);

  const payload = await readJsonBody<ContactPayload>(request);
  if (!payload) return badRequest("Expected a JSON body.");
  if (payload.website) {
    return jsonResponse({ ok: true, id: createRequestId(), accepted: true }, { status: 202 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 80) errors.name = "Name must be between 2 and 80 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Email is not valid.";
  if (message.length < 10 || message.length > 1200) {
    errors.message = "Message must be between 10 and 1200 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return badRequest("Contact payload is invalid.", errors);
  }

  const id = createRequestId();
  const event = {
    id,
    name,
    email,
    message,
    source: payload.source ?? "umo-global-dossier",
    receivedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        console.error("CONTACT_WEBHOOK_FAILED", response.status, await response.text());
      }
    } catch (error) {
      console.error("CONTACT_WEBHOOK_ERROR", error);
    }
  } else {
    console.info("CONTACT_EVENT_ACCEPTED", { id, source: event.source });
  }

  return jsonResponse(
    {
      ok: true,
      id,
      accepted: true,
      persisted: Boolean(webhookUrl),
      message: webhookUrl
        ? "Contact event forwarded."
        : "Contact event validated. Configure CONTACT_WEBHOOK_URL to persist it outside the serverless runtime.",
    },
    {
      status: 202,
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}
