// Same-origin proxy to the booking-fe leads endpoint. The browser posts here
// so the form works from any origin (localhost dev included) — the backend's
// CORS allowlist never sees the browser, and the csrfGuard's X-Requested-With
// header is attached server-side. Also the abuse chokepoint: honeypot, per-IP
// throttle, and payload validation all run here so junk never reaches the
// backend (whose rate limit keys on this function's shared egress IP).
const NEATR_API = process.env.NEATR_API ?? "https://book.neatr.ai";

// ponytail: per-instance memory — resets on cold start and isn't shared
// across lambda instances, but bursts are exactly what spam looks like.
// Upgrade to Upstash/KV if real abuse shows up.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8; // a human lead is 2 posts (email + profile)
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  if (hits.size > 5000) hits.clear(); // ponytail: crude memory cap
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > 8192) {
    return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: humans never see the field; bots that fill it get a fake
  // success and nothing is forwarded.
  if (typeof data.hp === "string" && data.hp !== "") {
    return Response.json({ ok: true }, { status: 201 });
  }

  const email = typeof data.email === "string" ? data.email.trim() : "";
  const source = typeof data.source === "string" ? data.source.slice(0, 120) : undefined;
  const message = typeof data.message === "string" ? data.message.slice(0, 2000) : undefined;
  if (!email || email.length > 254 || !email.includes("@")) {
    return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  try {
    const r = await fetch(`${NEATR_API}/api/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
      body: JSON.stringify({ email, source, message }),
    });
    return new Response(await r.text(), {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return Response.json({ ok: false, error: "Upstream unavailable" }, { status: 502 });
  }
}
