export async function onRequest() {
  const data = await CMS_PUNTOS.get('puntos')

  if (!data) {
    return new Response(
      JSON.stringify({ puntos: [] }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

  return new Response(data, {
    headers: { 'Content-Type': 'application/json' }
  })
}
