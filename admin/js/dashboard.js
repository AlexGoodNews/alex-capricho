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


    //Crear puntos
    const addButton = document.createElement('button')
    addButton.textContent = 'Añadir nuevo punto'
    addButton.onclick = () => {
        const index = puntos.length

        const nuevoPunto = {
            id: `punto${index + 1}`,
            nombre: { es: "", en: "" },
            descripcion: { es: "", en: "" },
            coords: [0, 0],
            accesible: false,
            media: {
                audio_es: "",
                audio_en: "",
                video_signos: ""
            }
        }

        puntos.push(nuevoPunto)

        const div = document.createElement('div')
        div.classList.add('punto-card')
        div.innerHTML = generarPuntoHTML(nuevoPunto, index)

        dashboardDiv.insertBefore(div, saveButton)
    }

    dashboardDiv.appendChild(addButton)


    //Borrar Puntos
    dashboardDiv.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index)

        // 1. Eliminar del array
        puntos.splice(index, 1)

        // 2. Recargar dashboard para reindexar inputs
        initDashboard()
        })
    })


    //actualizar puntos
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
