export async function onRequest() {
  const data = await CMS_PUNTOS.get('CMS_ALEXPUNTOS')
  return new Response(data, {
    headers: { 'Content-Type': 'application/json' }
  })
}
