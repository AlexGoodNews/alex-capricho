export async function onRequest() {
  const hasKV = typeof CMS_ALEXPUNTOS !== 'undefined'
  const value = hasKV ? await CMS_ALEXPUNTOS.get('puntos') : null

  return new Response(
    JSON.stringify({
      hasKV,
      value
    }),
    { headers: { 'Content-Type': 'application/json' } }
  )
}
