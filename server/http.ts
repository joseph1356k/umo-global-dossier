export type ApiHandler = (request: Request) => Promise<Response> | Response;

const securityHeaders = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
};

export function jsonResponse(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(securityHeaders)) {
    headers.set(key, value);
  }

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

export function methodNotAllowed(allowed: string[]) {
  return jsonResponse(
    {
      ok: false,
      error: "method_not_allowed",
      allowed,
    },
    {
      status: 405,
      headers: {
        allow: allowed.join(", "),
        "cache-control": "no-store",
      },
    },
  );
}

export function badRequest(message: string, details?: unknown) {
  return jsonResponse(
    {
      ok: false,
      error: "bad_request",
      message,
      details,
    },
    {
      status: 400,
      headers: { "cache-control": "no-store" },
    },
  );
}

export function notFound(message = "Resource not found") {
  return jsonResponse(
    {
      ok: false,
      error: "not_found",
      message,
    },
    {
      status: 404,
      headers: { "cache-control": "no-store" },
    },
  );
}

export async function readJsonBody<T>(request: Request): Promise<T | null> {
  const type = request.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    return null;
  }

  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
