async function initDashboard() {
    const app = document.getElementById("app")

    app.innerHTML = `
        <h1>Gestión de eventos</h1>

        <div id="calendar"></div>

        <div id="modalEvento" style="display:none;">
            <div id="modalContent">
                <h2>Nuevo Evento</h2>

                <label>Título:</label>
                <input type="text" id="inputTitulo"><br><br>

                <label>Hora inicio:</label>
                <input type="time" id="inputHora"><br><br>

                <label>Ubicación:</label>
                <input type="text" id="inputUbicacion"><br><br>

                <label>Descripción:</label>
                <textarea id="inputDescripcion"></textarea><br><br>

                <button id="guardarEvento">Guardar</button>
                <button id="cancelarEvento">Cancelar</button>
            </div>
        </div>
    `

    const response = await fetch('/data/eventos.json')
    let eventos = await response.json()

    const calendarEl = document.getElementById('calendar')

    const modal = document.getElementById("modalEvento")
    const inputTitulo = document.getElementById("inputTitulo")
    const inputHora = document.getElementById("inputHora")
    const inputUbicacion = document.getElementById("inputUbicacion")
    const inputDescripcion = document.getElementById("inputDescripcion")

    let fechaSeleccionada = ""

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        events: eventos,

        dateClick(info) {
            fechaSeleccionada = info.dateStr

            inputTitulo.value = ""
            inputHora.value = "12:00"
            inputUbicacion.value = ""
            inputDescripcion.value = ""

            modal.style.display = "flex"
        },

        eventClick(info) {
            if (!confirm("¿Eliminar evento?")) return

            const id = info.event.id

            eventos = eventos.filter(e => e.id !== id)

            info.event.remove()

            guardarEventos()
        }
    })

    calendar.render()

    document
        .getElementById("guardarEvento")
        .addEventListener("click", async () => {

            const nuevoEvento = {
                id: Date.now().toString(),
                title: inputTitulo.value,
                start: fechaSeleccionada + "T" + inputHora.value,
                extendedProps: {
                    ubicacion: inputUbicacion.value,
                    descripcion: inputDescripcion.value
                }
            }

            eventos.push(nuevoEvento)

            calendar.addEvent(nuevoEvento)

            modal.style.display = "none"

            await guardarEventos()
        })

    document
        .getElementById("cancelarEvento")
        .addEventListener("click", () => {
            modal.style.display = "none"
        })

    async function guardarEventos() {
        const resp = await fetch('/data/eventos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventos)
        })

        if (!resp.ok) {
            alert("Error guardando eventos")
        }
    }
}

initDashboard()