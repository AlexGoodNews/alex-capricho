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
  attributionControl: false
});



const bounds = [[0, 0], [height, width]];
L.imageOverlay('img/plano-museo.png', bounds).addTo(map);
map.fitBounds(bounds);
map.setZoom(-3); 
// Debug temporal para ver coordenadas
map.on('click', e => console.log(e.latlng));

// Cargar puntos desde JSON
fetch('data/puntos.json')
  .then(res => res.json())
  .then(puntos => {
    puntos.forEach(punto => {
      // Usamos siempre el mismo icono
      const marker = L.marker(punto.coords, { icon: puntoInfoIcon }).addTo(map);

      // Elegimos la imagen de accesibilidad para el popup
      const iconoAccesibilidad = punto.accesible ? iconoAccesible : iconoNoAccesible;
      const popupHTML = `
        <div class="card border-0 popup-contenido p-2">
          <h5 class="card-title mb-1">${punto.nombre.es}</h5>
          <h6 class="text-muted mb-2">${punto.nombre.en}</h6>

          <div class="popup-informacion-extra mb-2">
            <img src="${iconoAccesibilidad}" 
                class="popup-icono-informativo" 
                alt="${punto.accesible ? 'Accesible' : 'No accesible'}"
                title="${punto.accesible ? 'Accesible' : 'No accesible'}" />
            <!-- Podrás agregar más iconos aquí más adelante -->
          </div>

          <p class="card-text small">
            ${punto.descripcion.es}<br>
            <em class="mt-2 d-block">${punto.descripcion.en}</em>
            ${!punto.accesible ? `
              <span class="text-danger d-block mt-1">
                 No accesible para sillas de ruedas.<br>
                <em> Not accessible for wheelchairs.</em>
              </span>
            ` : ''}
          </p>


          <div class="iconos-reproductores mb-2">
            <img src="icons/espana.png" class="icono-media" data-type="audio_es" alt="Audio ES" title="Audio en Español">
            <img src="icons/reino-unido.png" class="icono-media" data-type="audio_en" alt="Audio EN" title="Audio en Inglés">
            <img src="icons/hola-Signos.png" class="icono-media" data-type="video" alt="Lengua de Signos" title="Lengua de signos">
          </div>

          <div id="media-container-${punto.id}" class="media-contenedor"></div>
        </div>
      `;

      /*
      const popupHTML = `
        <div style="position: relative;">
          <img src="${iconoAccesibilidad}" alt="Accesibilidad" title="${punto.accesible ? 'Accesible' : 'No accesible'}"
               style="position: absolute; top: 0; right: 0; width: 30px;" />
          <b>${punto.nombre.es}</b><br>
          <i>${punto.nombre.en}</i><br>
          <p>
            ${punto.descripcion.es}<br>
            <i>${punto.descripcion.en}</i>
          </p>
          <audio controls>
            <source src="${punto.media.audio_es}" type="audio/mpeg" />
          </audio><br>
          <audio controls>
            <source src="${punto.media.audio_en}" type="audio/mpeg" />
          </audio><br>
          <video controls width="200">
            <source src="${punto.media.video_signos}" type="video/mp4" />
          </video>
        </div>
      `;*/

     /*
      const popupHTML = `
        <div class="card popup-contenido p-2">
          <img src="${iconoAccesibilidad}" 
              class="popup-icono-accesibilidad" 
              alt="${punto.accesible ? 'Accesible' : 'No accesible'}"
              title="${punto.accesible ? 'Accesible' : 'No accesible'}" />

          <h5 class="card-title mb-1">${punto.nombre.es}</h5>
          <h6 class="text-muted mb-2">${punto.nombre.en}</h6>

          <p class="card-text small">
            ${punto.descripcion.es}<br>
            <em>${punto.descripcion.en}</em>
          </p>

          <audio class="w-100 mb-2" controls>
            <source src="${punto.media.audio_es}" type="audio/mpeg" />
          </audio>
          <audio class="w-100 mb-2" controls>
            <source src="${punto.media.audio_en}" type="audio/mpeg" />
          </audio>
          <video class="w-100" controls>
            <source src="${punto.media.video_signos}" type="video/mp4" />
          </video>
        </div>
      `;
      */
      marker.bindPopup(popupHTML);
      marker.puntoData = punto; 
    });
  })
  .catch(err => console.error("Error cargando puntos:", err));

window.addEventListener('resize', () => {
  map.invalidateSize();
});

map.on('popupopen', function (e) {
  const punto = e.popup._source.puntoData;
  const mediaContainer = document.getElementById(`media-container-${punto.id}`);

  e.popup._container.querySelectorAll('.icono-media').forEach(icon => {
    icon.addEventListener('click', () => {
      const tipo = icon.getAttribute('data-type');
      mediaContainer.innerHTML = ''; // Vaciar el contenedor

      if (tipo === 'audio_es') {
        mediaContainer.innerHTML = `
          <audio controls class="w-100">
            <source src="${punto.media.audio_es}" type="audio/mpeg" />
            Tu navegador no soporta audio.
          </audio>
        `;
      } else if (tipo === 'audio_en') {
        mediaContainer.innerHTML = `
          <audio controls class="w-100">
            <source src="${punto.media.audio_en}" type="audio/mpeg" />
            Tu navegador no soporta audio.
          </audio>
        `;
      } else if (tipo === 'video') {
        mediaContainer.innerHTML = `
          <video controls class="w-100">
            <source src="${punto.media.video_signos}" type="video/mp4" />
            Tu navegador no soporta video.
          </video>
        `;
      }
    });
  });
});
