export async function onRequest() {
  const hasKV = typeof CMS_PUNTOS !== 'undefined'
  const value = hasKV ? await CMS_PUNTOS.get('puntos') : null

  return new Response(
    JSON.stringify({
      hasKV,
      value
    }),
    { headers: { 'Content-Type': 'application/json' } }
  )
}
