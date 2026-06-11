export async function onRequest(context) {
  const kv = context.env.CMS_PUNTOS

  if (context.request.method === "GET") {
    const data = await kv.get("puntos", { type: "json" })
    return Response.json(data || { puntos: [] })
  }

  if (context.request.method === "POST") {
    const body = await context.request.json()
    await kv.put("puntos", JSON.stringify(body))
    return Response.json({ ok: true })
  }

  return new Response("Método no permitido", { status: 405 })
}
