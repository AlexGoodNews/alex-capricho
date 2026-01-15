function generarPuntoHTML(punto, index) {
  return `
    <h3>ID: <input type="text" id="id-${index}" value="${punto.id}"></h3>

    <h4>Nombre</h4>
    ES: <input type="text" id="nombre-es-${index}" value="${punto.nombre.es}"><br>
    EN: <input type="text" id="nombre-en-${index}" value="${punto.nombre.en}"><br>

    <h4>Descripción</h4>
    ES: <textarea id="descripcion-es-${index}">${punto.descripcion.es}</textarea><br>
    EN: <textarea id="descripcion-en-${index}">${punto.descripcion.en}</textarea><br>

    <h4>Coordenadas</h4>
    X: <input type="text" id="coord-x-${index}" value="${punto.coords[0]}">
    Y: <input type="text" id="coord-y-${index}" value="${punto.coords[1]}"><br>

    <label>
      Accesible: <input type="checkbox" id="accesible-${index}" ${punto.accesible ? 'checked' : ''}>
    </label><br>

    <h4>Media</h4>
    Audio ES: <input type="text" id="audio-es-${index}" value="${punto.media.audio_es || ''}"><br>
    Audio EN: <input type="text" id="audio-en-${index}" value="${punto.media.audio_en || ''}"><br>
    Video Signos: <input type="text" id="video-${index}" value="${punto.media.video_signos || ''}"><br>

    <button class="delete-btn" data-index="${index}">Eliminar punto</button>

  `
}
