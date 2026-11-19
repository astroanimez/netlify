import { getUser } from "@netlify/identity";

export default async function requireSignIn(request) {
  const url = new URL(request.url);
  const read = request.method === "GET" || request.method === "HEAD";
  const publicFile = ["/", "/index.html", "/login.js"].includes(url.pathname);

  if ((read && publicFile) || url.pathname.startsWith("/.netlify/identity/")) return;

  try {
    if (await getUser()) return;
  } catch {
    return new Response("Sign-in is temporarily unavailable.", {
      status: 503,
      headers: { "Cache-Control": "no-store" }
    });
  }

  return new Response(null, {
    status: read ? 302 : 401,
    headers: {
      ...(read ? { Location: "/" } : {}),
      "Cache-Control": "no-store"
    }
  });
}

export const config = { path: "/*" };
