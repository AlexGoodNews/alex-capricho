export async function onRequest(context) {
  const kv = context.env.CMS_ALEXPUNTOS

  if (context.request.method === "GET") {
    const eventos = await kv.get("eventos", {
      type: "json"
    })

    return Response.json(eventos || [])
  }

  if (context.request.method === "POST") {
    const eventos = await context.request.json()

    await kv.put(
      "eventos",
      JSON.stringify(eventos)
    )

    return Response.json({
      ok: true
    })
  }

  return new Response("Método no permitido", {
    status: 405
  })
}