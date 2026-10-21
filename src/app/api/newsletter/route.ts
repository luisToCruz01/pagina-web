// Suscripción al newsletter: guarda el correo en Airtable (base RDMD CRM, tabla Newsletter).
// Variables de entorno (Vercel y .env.local): AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_NEWSLETTER_TABLE.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_NEWSLETTER_TABLE } = process.env;
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_NEWSLETTER_TABLE) {
    return Response.json({ ok: false, error: "config" }, { status: 500 });
  }

  let body: { email?: unknown; company?: unknown; page?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Campo trampa: los bots lo llenan, las personas no lo ven
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ ok: false, error: "email" }, { status: 400 });
  }
  const page = typeof body.page === "string" ? body.page.slice(0, 200) : "";

  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_NEWSLETTER_TABLE}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      records: [{ fields: { Email: email, Fecha: new Date().toISOString(), Origen: "rdmdco.com newsletter", Pagina: page } }],
      typecast: true,
    }),
  });

  if (!res.ok) {
    console.error("newsletter airtable", res.status, await res.text());
    return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
