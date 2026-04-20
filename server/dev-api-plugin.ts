import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import {
  handleContact,
  handleDeliveries,
  handleHealth,
  handleProject,
  handleSearch,
} from "./api-handlers";
import type { ApiHandler } from "./http";
import { notFound } from "./http";

const handlers: Record<string, ApiHandler> = {
  "/api/health": handleHealth,
  "/api/project": handleProject,
  "/api/deliveries": handleDeliveries,
  "/api/search": handleSearch,
  "/api/contact": handleContact,
};

function readNodeBody(request: IncomingMessage) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

async function toWebRequest(request: IncomingMessage) {
  const host = request.headers.host ?? "127.0.0.1:5173";
  const url = new URL(request.url ?? "/", `http://${host}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      value.forEach((item) => headers.append(key, item));
    } else if (typeof value === "string") {
      headers.set(key, value);
    }
  }

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const body = hasBody ? new Uint8Array(await readNodeBody(request)) : undefined;
  return new Request(url, {
    method: request.method,
    headers,
    body,
  });
}

async function writeNodeResponse(response: ServerResponse, webResponse: Response) {
  response.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => response.setHeader(key, value));
  const body = Buffer.from(await webResponse.arrayBuffer());
  response.end(body);
}

export function devApiPlugin(): Plugin {
  return {
    name: "umo-dev-api",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
        if (!pathname.startsWith("/api/")) {
          next();
          return;
        }

        try {
          const webRequest = await toWebRequest(request);
          const handler = handlers[pathname];
          const webResponse = handler ? await handler(webRequest) : notFound("API route not found");
          await writeNodeResponse(response, webResponse);
        } catch (error) {
          console.error("DEV_API_ERROR", error);
          await writeNodeResponse(
            response,
            new Response(JSON.stringify({ ok: false, error: "internal_error" }), {
              status: 500,
              headers: { "content-type": "application/json; charset=utf-8" },
            }),
          );
        }
      });
    },
  };
}
