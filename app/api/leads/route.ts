// Same-origin proxy to the booking-fe leads endpoint. The browser posts here
// so the form works from any origin (localhost dev included) — the backend's
// CORS allowlist never sees the browser, and the csrfGuard's X-Requested-With
// header is attached server-side.
const NEATR_API = process.env.NEATR_API ?? "https://book.neatr.ai";

export async function POST(request: Request) {
  const body = await request.text();
  try {
    const r = await fetch(`${NEATR_API}/api/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
      body,
    });
    return new Response(await r.text(), {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return Response.json({ ok: false, error: "Upstream unavailable" }, { status: 502 });
  }
}
