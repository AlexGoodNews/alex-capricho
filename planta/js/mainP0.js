const params = new URLSearchParams(window.location.search);
const puntoIdDesdeQR = params.get("punto");

// Dimensiones de la imagen del plano
const width = 2000;
const height = 1500;

// Crear el mapa
/*
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1
});
*/
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2.5,
  maxZoom: 2,
  attributionControl: false,
  zoomControl: false
});



const bounds = [[0, 0], [height, width]];
L.imageOverlay('/img/planta1/plano-museoP1.png', bounds).addTo(map);
map.fitBounds(bounds);
map.setZoom(-3); 
// Debug temporal para ver coordenadas
map.on('click', e => console.log(e.latlng));

const iconosPunto = {
  wc: wcIcon,
  escalera: escalerasIcon,
  salonActos: salonActosIcon,
  restrictedArea: restrictedAreaIcon
};

// Cargar puntos desde JSON
fetch('/data/planta1/puntosP0.json') //antiguo sin cloudflare
//fetch('/api/get-puntos')
  .then(res => res.json())
  .then(data => {
    let puntoEncontrado = null;
    data.puntos.forEach(punto => {

      // Usamos siempre el mismo icono
      const iconoPunto = punto.icono
        ? iconosPunto[punto.icono] || puntoInfoIcon
        : puntoInfoIcon;

      const marker = L.marker(punto.coords, {
        icon: iconoPunto
      }).addTo(map);



      // Elegimos la imagen de accesibilidad para el popup
      const iconoAccesibilidad = punto.accesible ? iconoAccesible : iconoNoAccesible;
      const popupHTML = `
        <div class="card border-0 popup-contenido p-2">
          <h5 class="card-title mb-1 titulo-texto"
              data-es="${punto.nombre.es}"
              data-en="${punto.nombre.en}">
              ${punto.nombre.es}
          </h5>

          <div class="popup-informacion-extra mb-2">
            <img src="${iconoAccesibilidad}" 
                class="popup-icono-informativo" 
                alt="${punto.accesible ? 'Accesible' : 'No accesible'}"
                title="${punto.accesible ? 'Accesible' : 'No accesible'}" />
            <!-- Podrás agregar más iconos aquí más adelante -->
          </div>

          ${punto.descripcion ? `
            <p class="card-text small descripcion-texto"
              data-es="${punto.descripcion.es}"
              data-en="${punto.descripcion.en}"
              data-accesible="${punto.accesible}">
              ${punto.descripcion.es}
              ${!punto.accesible ? `
                <span class="text-danger d-block mt-1">
                  No accesible para sillas de ruedas.
                </span>
              ` : ''}
            </p>
          ` : `
            ${!punto.accesible ? `
              <p class="card-text small descripcion-texto"
                data-es=""
                data-en=""
                data-accesible="false">
                <span class="text-danger d-block mt-1">
                  No accesible para sillas de ruedas.
                </span>
              </p>
            ` : ''}
          `}

          ${punto.media ? `
            <div class="iconos-reproductores mb-2">
              <img src="/icons/espana.png"
                  class="icono-media"
                  data-type="audio_es"
                  alt="Audio ES"
                  title="Audio en Español">

              <img src="/icons/reino-unido.png"
                  class="icono-media"
                  data-type="audio_en"
                  alt="Audio EN"
                  title="Audio en Inglés">

              <img src="/icons/hola-Signos.png"
                  class="icono-media"
                  data-type="video"
                  alt="Lengua de Signos"
                  title="Lengua de signos">
            </div>
          ` : ''}

          <div id="media-container-${punto.id}" class="media-contenedor"></div>
        </div>
      `;
      marker.bindPopup(popupHTML, {
          autoPan: true,
          offset: [0, 250], // [x, y] en px, positivo y mueve hacia abajo
      });
      marker.puntoData = punto; 
      
        marker.on('click', function () { //si hago click en el punto hace zoom tamb
          const latlng = marker.getLatLng();

          map.flyTo(latlng, 0.8, { // zoom menor que el del QR
            duration: 1
          });
        })
      //http://ip:8888/planta/index.html?punto=punto1 para saber cada QR
      //GUARDAMOS EL MARKER SI COINCIDE CON EL QR 
      if (puntoIdDesdeQR && punto.id == puntoIdDesdeQR) {
        puntoEncontrado = marker;
      }
    });
      //CUANDO TERMINA TODO, centramos
    if (puntoEncontrado) {
      const latlng = puntoEncontrado.getLatLng();

      map.flyTo(latlng, 1.5, { duration: 1.5 });

      setTimeout(() => {
        puntoEncontrado.openPopup();
      }, 800);
    }
  })
  .catch(err => console.error("Error cargando puntos:", err));

window.addEventListener('resize', () => {
  map.invalidateSize();
});

function actualizarDescripcion(idioma, descripcion) {
  const es = descripcion.dataset.es;
  const en = descripcion.dataset.en;
  const accesible = descripcion.dataset.accesible === "true";

  let texto = idioma === 'es' ? es : en;

  let aviso = '';
  if (!accesible) {
    aviso = idioma === 'es'
      ? `<span class="text-danger d-block mt-1">No accesible para sillas de ruedas.</span>`
      : `<span class="text-danger d-block mt-1">Not accessible for wheelchairs.</span>`;
  }

  descripcion.innerHTML = texto + aviso;
}

map.on('popupopen', function (e) {
  const punto = e.popup._source.puntoData;
  const mediaContainer = document.getElementById(`media-container-${punto.id}`);

  const popupContainer = e.popup._container;

  const titulo = popupContainer.querySelector('.titulo-texto');
  const descripcion = popupContainer.querySelector('.descripcion-texto'); 

  e.popup._container.querySelectorAll('.icono-media').forEach(icon => {
    icon.addEventListener('click', () => {
      const tipo = icon.getAttribute('data-type');
      mediaContainer.innerHTML = '';

      // CAMBIO DE IDIOMA
      if (tipo === 'audio_es') {
        titulo.textContent = titulo.dataset.es;
        actualizarDescripcion('es', descripcion);
      }

      if (tipo === 'audio_en') {
        titulo.textContent = titulo.dataset.en;
        actualizarDescripcion('en', descripcion);
      }

      // AUDIO / VIDEO
      if (tipo === 'audio_es') {
        mediaContainer.innerHTML = `
          <audio controls controlsList="nodownload noplaybackrate noremoteplayback" class="w-100">
            <source src="${punto.media.audio_es}" type="audio/mpeg" />
          </audio>
        `;
      } else if (tipo === 'audio_en') {
        mediaContainer.innerHTML = `
          <audio controls controlsList="nodownload noplaybackrate noremoteplayback" class="w-100">
            <source src="${punto.media.audio_en}" type="audio/mpeg" />
          </audio>
        `;
      } else if (tipo === 'video') {
        mediaContainer.innerHTML = `
          <video controls class="w-100">
            <source src="${punto.media.video_signos}" type="video/mp4" />
          </video>
        `;
      }
    });
  });
});
