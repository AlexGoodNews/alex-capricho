// Datos para cada idioma
const contentData = {
    item1: {
        ES: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'La historia de las casas de Osuna y Benavente, dos de los linajes nobiliarios más influyentes de España, desde sus orígenes legendarios en la Reconquista hasta su apogeo en el siglo XIX. El video recorre sus grandes figuras —como el Gran Duque de Osuna, virrey de Nápoles—, sus alianzas con Hernán Cortés o los Borgia, y el legado artístico del panteón ducal en la Colegiata de Osuna. Un relato de poder, diplomacia y transformación que culmina con los cambios del Antiguo Régimen y su impacto en El Capricho.'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho copia.mp4',
            text: 'The history of the Houses of Osuna and Benavente—two of Spain’s most influential noble lineages—traces their journey from legendary origins during the Reconquista to their 19th-century zenith. The video explores key figures, such as the Grand Duke of Osuna (Viceroy of Naples); their alliances with the likes of Hernán Cortés and the Borgias; and the artistic legacy of the ducal pantheon at the Collegiate Church of Osuna. It is a tale of power, diplomacy, and transformation that culminates in the upheavals of the *Ancien Régime* and their impact on the El Capricho estate.'
        }
    },
    item2: {
        ES: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Madrid, 1771. María Josefa Alfonso-Pimentel, condesa-duquesa de Benavente, contrae matrimonio con su primo Pedro de Alcántara Téllez-Girón, uniendo dos de las casas nobiliarias más poderosas de la España del siglo XVIII: Osuna y Benavente. El IX duque, militar, académico y socio fundador de la Real Sociedad Matritense de Amigos del País, encarnó el ideal del aristócrata ilustrado. Junto a su esposa, cultivaron las artes, la música y la cultura, reuniendo a su alrededor a figuras como Goya o Boccherini. El video recorre su vida entre la corte, la diplomacia, la guerra y los círculos reformistas, así como la historia íntima de sus nueve hijos y las alianzas que prolongaron su influencia.'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Madrid, 1771. María Josefa Alfonso-Pimentel, Countess-Duchess of Benavente, married her cousin Pedro de Alcántara Téllez-Girón, uniting two of the most powerful noble houses in 18th-century Spain: Osuna and Benavente. The 9th Duke—a military officer, academic, and founding member of the Royal Madrid Society of Friends of the Country—embodied the ideal of the enlightened aristocrat. Together, the couple cultivated the arts, music, and culture, gathering figures such as Goya and Boccherini around them. The video traces their lives across the realms of the court, diplomacy, warfare, and reformist circles, while also exploring the personal stories of their nine children and the alliances that extended their influence.'
        }
    },
    item3: {
        ES: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Tres generaciones de los duques de Osuna marcaron la historia cultural y política de España. De la mano de sus ideales ilustrados, sus hijos y nietos —militares, diplomáticos, mecenas— llevaron el esplendor de la familia hasta las cortes europeas, mientras mantenían vivo su vínculo con la Alameda y El Capricho. Un legado de coleccionismo y tertulias que se dispersó tras la muerte del XII duque en 1882.'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Three generations of the Dukes of Osuna shaped Spain’s cultural and political history. Guided by their Enlightenment ideals, their children and grandchildren—military officers, diplomats, and patrons of the arts—carried the family’s splendor to the courts of Europe while maintaining their ties to La Alameda and El Capricho. It was a legacy of art collecting and intellectual gatherings that was dispersed following the death of the 12th Duke in 1882.'
        }
    },
    item4: {
        ES: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'El Capricho fue la residencia más querida de los duques de Osuna, pero solo una pieza de su extraordinario patrimonio. Palacios en Madrid —como el de la cuesta de la Vega o el de Anglona—, el castillo de Manzanares el Real, el palacio del Infantado en Guadalajara, y posesiones en París y Bélgica formaban parte de un legado que se extendía por Andalucía, Castilla, Levante y más allá. Entre todas estas propiedades, El Capricho ocupaba un lugar especial: una quinta de recreo concebida para el descanso, la cultura y el disfrute de la naturaleza.'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'El Capricho was the Duke and Duchess of Osuna’s most cherished residence, yet it was but one part of their extraordinary estate. Palaces in Madrid—such as those on Cuesta de la Vega and the Palacio de Anglona—the castle of Manzanares el Real, the Palacio del Infantado in Guadalajara, and holdings in Paris and Belgium were all part of a legacy that spanned Andalusia, Castile, the Levante, and beyond. Among all these properties, El Capricho held a special place: a country estate conceived for leisure, culture, and the enjoyment of nature.'
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
    /*
    let initialized = false;

    item.addEventListener('pointerenter', () => {
        if (initialized) return;

        const itemId = item.dataset.item;
        const data = contentData[itemId][DEFAULT_LANG];
        if (!data) return;

        const video = item.querySelector('video');
        const source = video.querySelector('source');
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
    const video = wrapper.querySelector('video');
    const touchLayer = wrapper.querySelector('.videoTouchLayer');

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