import { startScroll } from "./scroll.js";
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
            limpiarEventosPasados(100);
            guardarEventosServidor();
            procesarEventos();
        })
        .catch(err => console.error("Error cargando eventos", err));
}
function limpiarEventosPasados(dias) {
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
    const ahora = new Date();
    ahora.setHours(0, 0, 0, 0); // inicio del día
    const mesActual = ahora.getMonth();
    const añoActual = ahora.getFullYear();

    // Eventos de hoy
    const eventosMes = eventos
        .filter(e => {
            const fechaEvento = new Date(e.start);
            return (
                fechaEvento.getMonth() === mesActual &&
                fechaEvento.getFullYear() === añoActual
            );
        })
        .sort((a, b) => new Date(a.start) - new Date(b.start));

    const contHoy = document.getElementById("activitiesTrack");
    if (!contHoy) {
        console.warn("No existe #activitiesTrack en el DOM");
        return;
    }

    contHoy.innerHTML = "";

    if (eventosMes.length === 0) {
        contHoy.innerHTML = `<div class="card"><h1>No hay eventos hoy</h1></div>`;
    } else {
        eventosMes.forEach(ev => {
            const fechaES = ev.fecha || "";
            const fechaEN = ev.fechaIngles || "";

            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
                <div class="act-item">

                    <div class="act-left">
                        <div class="es">${ev.title || ""}</div>
                        <div class="en">${ev.titleEn || ""}</div>
                    </div>

                    <div class="act-right">
                        <div class="es">${fechaES}</div>
                        <div class="en">${fechaEN}</div>
                    </div>

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
    //animate scroll
    startScroll();
}
// -------------------------
// Carga inicial y refresco automático cada 30 segundos
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    cargarEventos(); //primera carga
    setInterval(cargarEventos, 3000000); //espera media hora
});