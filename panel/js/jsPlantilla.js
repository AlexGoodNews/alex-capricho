let eventos = [];
const API_BASE = localStorage.getItem("api_url") || window.location.origin;
/*const API_URL = localStorage.getItem("api_url") || "http://localhost:8888";*/ /*Cloudflare*/

//detector de mes
const meses = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const fecha = new Date();
const mes = fecha.getMonth(); // devuelve 0-11

document.getElementById("mesActual").textContent = meses[mes];

// Función para cargar eventos desde el servidor
function cargarEventos() {
    /*fetch(`${API_URL}/api/eventos`)*//*Cloudflare irrelevante no funciona en cloudflare*/
    fetch(`${API_BASE}/api/eventos`)
        .then(res => res.json())
        .then(data => {
            eventos = data;
            limpiarEventosPasados(1);
            guardarEventosServidor();
            procesarEventos();
        })
        .catch(err => console.error("Error cargando eventos", err));
}
function limpiarEventosPasados(dias = 1) {
  const ahora = new Date();

  // Restamos los días que quieras conservar
  const limite = new Date();
  limite.setDate(ahora.getDate() - dias);
  limite.setHours(0, 0, 0, 0);

  eventos = eventos.filter(e => {
    const fechaEvento = new Date(e.start);
    return fechaEvento >= limite;
  });
}
function guardarEventosServidor() {
    fetch(`${API_BASE}/api/eventos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventos)
    })
    .then(res => res.json())
    .then(data => console.log("Eventos guardados"))
    .catch(err => console.error("Error guardando eventos", err));
}

// Eventos de hoy y próximos
function procesarEventos() {
    //const hoy = new Date().toISOString().split("T")[0];
    const ahora = new Date();
    ahora.setHours(0, 0, 0, 0); // inicio del día
    const mesActual = ahora.getMonth();
    const añoActual = ahora.getFullYear();

    // Eventos de hoy

    /*
    const eventosHoy = eventos
    .filter(e => {
        const fechaEvento = new Date(e.start);
        return fechaEvento.toDateString() === hoy.toDateString();
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start));
    */
    const eventosMes = eventos
        .filter(e => {
            const fechaEvento = new Date(e.start);
            return (
                fechaEvento.getMonth() === mesActual &&
                fechaEvento.getFullYear() === añoActual
            );
        })
        .sort((a, b) => new Date(a.start) - new Date(b.start));



    const contHoy = document.getElementById("hoyEventos");
    contHoy.innerHTML = "";

    if (eventosMes.length === 0) {
        contHoy.innerHTML = `<div class="card"><h1>No hay eventos hoy</h1></div>`;
    } else {
        eventosMes.forEach(ev => {
            const fechaObj = new Date(ev.start);

            const dia = fechaObj.getDate().toString().padStart(2, "0");
            const hora = fechaObj.toTimeString().slice(0, 5); // HH:MM

            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
                <div class="dia-grande">${dia}</div>
                <div class="contenido">
                    <div class="hora">${hora}</div>
                    <h1>${ev.title}</h1>
                    <div class="meta">${ev.extendedProps?.ubicacion || ""}</div>
                    <div class="descripcion">${ev.extendedProps?.descripcion || ""}</div>
                </div>
            `;
            contHoy.appendChild(div);
        });
    }

    // Próximos eventos
    const proximos = eventos
    .filter(e => {
        const fechaEvento = new Date(e.start);
        return fechaEvento > ahora; // solo hoy o futuro
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start));

    const lista = document.getElementById("listaProximos");
    lista.innerHTML = "";

    proximos.forEach(ev => {
        const div = document.createElement("div");
        div.className = "evento";
        const fecha = ev.start.split("T")[0];
        const hora = ev.start.split("T")[1] || "";
        div.innerHTML = `<strong>${ev.title}</strong><br>${fecha} ${hora}`;
        lista.appendChild(div);
    });
}

// -------------------------
// Carga inicial y refresco automático cada 30 segundos
// -------------------------
cargarEventos(); // primera carga
setInterval(cargarEventos, 3000000); // cada 30 minutos