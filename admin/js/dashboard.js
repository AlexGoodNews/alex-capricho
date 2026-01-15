async function initDashboard() {
  const response = await fetch('/api/get-puntos')
  const data = await response.json()
  const puntos = data.puntos

  const dashboardDiv = document.getElementById('dashboard')
  dashboardDiv.innerHTML = ''

  puntos.forEach((punto, index) => {
    const div = document.createElement('div')
    div.classList.add('punto-card')
    div.innerHTML = generarPuntoHTML(punto, index)
    dashboardDiv.appendChild(div)
  })

  const saveButton = document.createElement('button')
  saveButton.textContent = 'Guardar cambios'
  saveButton.onclick = async () => {
    puntos.forEach((punto, index) => {
      punto.id = document.getElementById(`id-${index}`).value
      punto.nombre.es = document.getElementById(`nombre-es-${index}`).value
      punto.nombre.en = document.getElementById(`nombre-en-${index}`).value
      punto.descripcion.es = document.getElementById(`descripcion-es-${index}`).value
      punto.descripcion.en = document.getElementById(`descripcion-en-${index}`).value
      punto.coords[0] = document.getElementById(`coord-x-${index}`).value
      punto.coords[1] = document.getElementById(`coord-y-${index}`).value
      punto.accesible = document.getElementById(`accesible-${index}`).checked
      punto.media.audio_es = document.getElementById(`audio-es-${index}`).value
      punto.media.audio_en = document.getElementById(`audio-en-${index}`).value
      punto.media.video_signos = document.getElementById(`video-${index}`).value
    })

    const resp = await fetch('/api/get-puntos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ puntos })
    })

    alert(resp.ok ? "Cambios guardados correctamente" : "Error al guardar")
  }

  dashboardDiv.appendChild(saveButton)
}
