async function initDashboard() {
    //const app = document.getElementById("app")
    const app = document.getElementById("dashboard")

    app.innerHTML = `
        <h1>Gestión de eventos</h1>

        <div id="calendar"></div>

        <div id="modalEvento" style="display:none;">
            <div class= "infoInput" id="modalContent">
                <h2>Nuevo Evento</h2>

                <label>Título (ES):</label>
                <input type="text" id="inputTitulo"><br><br>

                <label>Título (EN):</label>
                <input type="text" id="inputTituloEn"><br><br>

                <label>Hora inicio:</label>
                <input type="time" id="inputHora"><br><br>

                <button id="guardarEvento">Guardar</button>
                <button id="cancelarEvento">Cancelar</button>
            </div>
        </div>
    `

    const response = await fetch('/api/eventos') //cloud flare le gusta asi aunque este dentro de functions
    let eventos = await response.json()

    const calendarEl = document.getElementById('calendar')

    const modal = document.getElementById("modalEvento")
    const inputTitulo = document.getElementById("inputTitulo")
    const inputTituloEn = document.getElementById("inputTituloEn")
    const inputHora = document.getElementById("inputHora")

    /*
    const inputUbicacion = document.getElementById("inputUbicacion")
    const inputDescripcion = document.getElementById("inputDescripcion")
    */

    let fechaSeleccionada = ""

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        events: eventos,

        dateClick(info) {
            fechaSeleccionada = info.dateStr

            inputTitulo.value = ""
            inputTituloEn.value = ""
            inputHora.value = "12:00"
            //inputUbicacion.value = ""
            //inputDescripcion.value = ""

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
            /*
            const nuevoEvento = {
                id: Date.now().toString(),
                title: inputTitulo.value,
                start: fechaSeleccionada + "T" + inputHora.value,
                extendedProps: {
                    ubicacion: inputUbicacion.value,
                    descripcion: inputDescripcion.value
                }
            }*/
           const fechas = formatearFechas(fechaSeleccionada)
           const nuevoEvento = {
                id: Date.now().toString(),
                title: inputTitulo.value,
                titleEn: inputTituloEn.value,
                start: `${fechaSeleccionada}T${inputHora.value}`,
                fecha: fechas.fechaES,
                fechaIngles: fechas.fechaEN
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
        const resp = await fetch('/api/eventos', {
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
    // Evento para cerrar haciendo clic fuera del modal
    document.getElementById('modalEvento').addEventListener('click', function(e) {
        if (e.target === this) { // Solo si clic en el fondo oscuro
            cerrarModal();
        }
    });

}
function formatearFechas(dateStr) {
    const date = new Date(dateStr + "T00:00:00")

    const fechaES = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(date)

    const fechaEN = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(date)

    return {
        fechaES,
        fechaEN: fechaEN.charAt(0).toUpperCase() + fechaEN.slice(1)
    }
}
window.addEventListener("load", async () => {
  await window.Clerk.load();

  if (window.Clerk.user) {
    initDashboard();
  }
});