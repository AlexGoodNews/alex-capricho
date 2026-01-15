export async function onRequest() {
  const data = await CMS_PUNTOS.get('puntos')
  return new Response(data, {
    headers: { 'Content-Type': 'application/json' }
  })
}
