// Datos para cada idioma
const contentData = {
    item1: {
        ES: {
            video: 'videos/PIEZA_16_AV1_v2_25mb.mp4',
            text: 'Esta sala, la más grande del palacio, fue originalmente un salón de baile y hacia 1844 se transformó en comedor de gala por encargo de los nietos de la duquesa de Osuna. Entonces se construyó la Escalera del Fauno y se instaló el panel de la Batalla de Issos. A principios del siglo XX, los Bauer la redecoraron, y durante la Guerra Civil se excavó una galería de escape subterránea. En ella se celebraron banquetes con invitados ilustres como Isabel II, Alejandro Dumas o los intelectuales del Congreso de Escritores de 1937.'
        },
        EN: {
            video: 'videos/PIEZA_16_AV1_v2_subsENG.mp4',
            text: 'This room, the largest in the palace, was originally a ballroom; around 1844, it was converted into a formal dining room at the behest of the Duchess of Osunas grandchildren. It was then that the Faun Staircase was built and the *Battle of Issus* panel installed. The Bauer family redecorated the room in the early 20th century, and an underground escape tunnel was excavated during the Civil War. Banquets were held here for distinguished guests such as Isabella II, Alexandre Dumas, and the intellectuals attending the 1937 Congress of Writers.'
        }
    },
    item2: {
        ES: {
            video: 'videos/PIEZA_16_AV2_v2_25mb.mp4',
            text: 'El 24 de octubre de 1831 se descubrió en la casa del Fauno de Pompeya un gran mosaico de más de 18 m², con un carro, doce caballos y veintiséis guerreros. Compuesto por tres millones de teselas, probablemente copiaba una obra griega perdida, tal vez de Apeles. El hallazgo atrajo a prensa, estudiosos y visitantes ilustres, e incluso Alejandro Dumas lo mencionó en Le Corricolo. Se debatió si conservarlo in situ o trasladarlo, y en 1844 se llevó al Reale Museo Borbonico, hoy Museo Arqueológico de Nápoles, tras un accidentado viaje de nueve días. Allí permaneció en el suelo hasta 1916, cuando se colocó en vertical, y fue restaurado en 2021. En 2005 se instaló una copia en la Casa del Fauno.'
        },
        EN: {
            video: 'videos/PIEZA_16_AV2_v2_subsENG_25mb.mp4',
            text: 'On October 24, 1831, a large mosaic measuring over 18 m²—featuring a chariot, twelve horses, and twenty-six warriors—was discovered in the House of the Faun in Pompeii. Composed of three million tesserae, it was likely a copy of a lost Greek work, possibly by Apelles. The discovery attracted the press, scholars, and distinguished visitors; even Alexandre Dumas mentioned it in *Le Corricolo*. There was debate over whether to preserve it *in situ* or relocate it; ultimately, in 1844, it was moved to the Reale Museo Borbonico (now the National Archaeological Museum of Naples) following a perilous nine-day journey. It remained on the floor there until 1916, when it was mounted vertically, and it underwent restoration in 2021. A replica was installed in the House of the Faun in 2005.'
        }
    },
    item3: {
        ES: {
            video: 'videos/PIEZA_16_AV3_v1_25mb.mp4',
            text: 'Desde el siglo XVI, las familias nobles europeas, sobre todo inglesas, enviaban a sus hijos a un viaje iniciático por Europa, el Grand Tour, con Italia como destino principal. Los viajeros seguían itinerarios concretos y realizaban rituales, entre ellos adquirir recuerdos o souvenirs que exhibían al volver. Estos objetos podían ser antigüedades auténticas o los primeros productos de una incipiente industria turística: vedute, bisutería, vajilla, jarrones, máscaras y réplicas de piezas antiguas. Esto supuso un gran negocio para artesanos italianos, como los talleres de cerámica del sur de Italia. Destacó la figulina Giustiniani, de Nápoles, que producía azulejos y réplicas de vasos griegos. De ella son el suelo embaldosado de este comedor y la placa cerámica de la Batalla de Issos, firmada en su parte trasera.'
        },
        EN: {
            video: 'videos/PIEZA_16_AV3_v1_engSUBS_25mb.mp4',
            text: 'From the 16th century onwards, noble European families—particularly the English—sent their children on a formative journey across Europe known as the Grand Tour, with Italy as the primary destination. Travelers followed specific itineraries and engaged in certain rituals, such as acquiring mementos or souvenirs to display upon their return. These objects ranged from authentic antiquities to the early products of a nascent tourism industry: *vedute* (views), costume jewelry, tableware, vases, masks, and replicas of ancient artifacts. This created a lucrative business for Italian artisans, such as the ceramic workshops of southern Italy. Notable among them was the Giustiniani manufactory in Naples, which produced tiles and replicas of Greek vases; the tiled floor of this dining room and the ceramic plaque depicting the Battle of Issus—signed on the back—originated there.'
        }
    },
    item4: {
        ES: {
            video: 'videos/PIEZA_16_AV4_v3_25mb.mp4',
            text: 'La reconstrucción cerámica del mosaico de Pompeya en El Capricho es la más desconocida de las repartidas por Europa. Todas se hicieron en Nápoles hacia los años cuarenta del siglo XIX, por encargo de reyes y príncipes, y reconstruyen las partes perdidas del original, aunque varían en dimensiones, baldosas y colorido. La mayoría se atribuyen al taller de Biagio Giustiniani e hijos. Italia conserva la del Castello di Agliè (Turín); Inglaterra, la de Chatsworth (1832-1844); Alemania, las de Potsdam (1843, Sanssouci) y Liebenberg; y Rusia, la del Hermitage, adquirida en 1852 y redescubierta en 2004. La de El Capricho decoraba el comedor de gala del palacio, de estilo pompeyano. Constaba de 231 baldosas y algo más de 16 m². La primera noticia aparece en 1845, en el Diccionario de Madoz, y en 1878 se documenta la inscripción que atribuía la obra a los Giustiniani. Restaurado en 2024, aún se desconoce cómo llegó a El Capricho.'
        },
        EN: {
            video: 'videos/PIEZA 16_AV4_v3_engSUB_25mb.mp4',
            text: 'The ceramic reconstruction of the Pompeii mosaic at El Capricho is the least known of those distributed across Europe. All were produced in Naples during the 1840s, commissioned by kings and princes; while they reconstruct the missing sections of the original, they vary in dimensions, tile composition, and coloring. Most are attributed to the workshop of Biagio Giustiniani and Sons. Italy holds the version at the Castello di Agliè (Turin); England, the one at Chatsworth (1832–1844); Germany, those at Potsdam (1843, Sanssouci) and Liebenberg; and Russia, the Hermitage version, acquired in 1852 and rediscovered in 2004. The El Capricho mosaic adorned the palaces formal dining room, which was designed in the Pompeian style. It comprised 231 tiles and covered an area of ​​slightly more than 16 m². The first mention of it appears in the 1845 *Diccionario de Madoz*, and an inscription attributing the work to the Giustinianis was documented in 1878. Although restored in 2024, the story of how it arrived at El Capricho remains unknown.'
        }
    }
};
const DEFAULT_LANG = 'ES';

// Seleccionamos botones
const langButtons = document.querySelectorAll('.btnLang');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        const item = btn.closest('.item');
        const itemId = item.dataset.item;

        const data = contentData[itemId][lang];
        if (!data) return;

        const videoTag = item.querySelector('video');
        const sourceTag = videoTag.querySelector('source');
        const text = item.querySelector('.contentText');

        sourceTag.src = data.video;
        videoTag.load();
        videoTag.pause();

        const videoWrapper = videoTag.closest('.videoWrapper');
        videoWrapper.classList.remove('playing');
        videoWrapper.classList.add('paused');

        text.textContent = data.text;
    });
});
document.querySelectorAll('.item').forEach(item => {
    if (item.classList.contains('noVideo')) return;

    document.querySelectorAll('.item').forEach(item => {
        const itemId = item.dataset.item;
        const data = contentData[itemId][DEFAULT_LANG];
        if (!data) return;

        const video = item.querySelector('video');
        const source = video.querySelector('source');
        const text = item.querySelector('.contentText');
        const wrapper = item.querySelector('.videoWrapper');

        // Cargar contenido inicial
        source.src = data.video;
        video.load();
        video.pause();

        wrapper.classList.remove('playing');
        wrapper.classList.add('paused');

        text.textContent = data.text;
    });
    /*
    let initialized = false;

    item.addEventListener('pointerenter', () => {
        if (initialized) return;

        const itemId = item.dataset.item;
        const data = contentData[itemId][DEFAULT_LANG];
        if (!data) return;

        const video = item.querySelector('video');
        if (!video) return;
        const source = video.querySelector('source');
        if (!source) return;
        const text = item.querySelector('.contentText');
        const wrapper = video.closest('.videoWrapper');

        // Cargar contenido inicial
        source.src = data.video;
        video.load();
        video.pause();

        wrapper.classList.remove('playing');
        wrapper.classList.add('paused');

        text.textContent = data.text;

        initialized = true;
    });
    */
});


const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('mouseleave', () => {
        const videos = item.querySelectorAll('video');
        videos.forEach(video => video.pause());
    });
});

document.querySelectorAll('.videoWrapper').forEach(wrapper => {
    if (!wrapper) return;

    const video = wrapper.querySelector('video');
    if (!video) return;
    const touchLayer = wrapper.querySelector('.videoTouchLayer');
    if (!touchLayer) return;
    
    let armed = false;

    // Estado inicial
    wrapper.classList.add('paused');

    touchLayer.addEventListener('click', e => {
        e.stopPropagation();

        if (!armed) {
            armed = true;
            return;
        }

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    video.addEventListener('play', () => {
        wrapper.classList.remove('paused');
        wrapper.classList.add('playing');
    });

    video.addEventListener('pause', () => {
        wrapper.classList.remove('playing');
        wrapper.classList.add('paused');
    });

    wrapper.closest('.item').addEventListener('mouseleave', () => {
        armed = false;
        video.pause();
    });
});

//cierra el item al rato

let closeTimeout;
const AUTO_CLOSE_TIME = 10 * 60 * 1000; // 10 minutos

items.forEach(item => {

    // 🔹 Abrir item
    item.addEventListener('click', () => {
        openItem(item);
    });

    // 🔹 Reiniciar tiempo si hay interacción dentro
    item.addEventListener('mousemove', () => {
        if (item.classList.contains('open')) {
            resetTimer(item);
        }
    });

    item.addEventListener('touchstart', () => {
        if (item.classList.contains('open')) {
            resetTimer(item);
        }
    });

    item.addEventListener('scroll', () => {
        if (item.classList.contains('open')) {
            resetTimer(item);
        }
    });
});

function openItem(item) {
    clearTimeout(closeTimeout);

    items.forEach(i => i.classList.remove('open'));
    item.classList.add('open');

    //console.log("open item");

    startTimer(item);
}

function startTimer(item) {
    closeTimeout = setTimeout(() => {
        item.classList.remove('open');
        //console.log("auto close");
    }, AUTO_CLOSE_TIME);
}

function resetTimer(item) {
    clearTimeout(closeTimeout);
    startTimer(item);
}