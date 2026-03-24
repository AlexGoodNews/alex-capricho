let eventos = [];
const API_BASE = localStorage.getItem("api_url") || window.location.origin;


/*const API_URL = localStorage.getItem("api_url") || "http://localhost:8888";*/ /*Cloudflare*/

/*fetch(`${API_URL}/api/eventos`)*//*Cloudflare*/
fetch(`${API_BASE}/api/eventos`)
    .then(res => res.json())
    .then(data => {
        eventos = data;
        procesarEventos();
    })
    .catch(err => console.error("Error cargando eventos", err));

// Eventos de hoy
function procesarEventos() {
    const hoy = new Date().toISOString().split("T")[0];

    // Eventos de hoy
    const eventosHoy = eventos
        .filter(e => e.start.startsWith(hoy))
        .sort((a, b) => new Date(a.start) - new Date(b.start));

    const contHoy = document.getElementById("hoyEventos");
    contHoy.innerHTML = "";

    if (eventosHoy.length === 0) {
        contHoy.innerHTML = `<div class="card"><h1>No hay eventos hoy</h1></div>`;
    } else {
        eventosHoy.forEach(ev => {
            const hora = ev.start.split("T")[1] || "";
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
                <h1>${ev.title}</h1>
                <div class="meta">${hora}</div>
                <div class="meta">${ev.extendedProps?.ubicacion || ""}</div>
                <div class="descripcion">${ev.extendedProps?.descripcion || ""}</div>
            `;
            contHoy.appendChild(div);
        });
    }

    // Próximos eventos
    const proximos = eventos
        .filter(e => !e.start.startsWith(hoy))
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

