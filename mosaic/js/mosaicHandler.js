// Datos para cada idioma
const contentData = {
    item1: {
        ES: {
            video: '/videos/RehabilitacionCapricho.mp4',
            text: 'El Palacio de El Capricho y las casas que lo rodean surgieron a finales del siglo XVIII como parte de un ambicioso proyecto ideado por María Josefa de la Soledad Alonso‑Pimentel y Téllez‑Girón, la IX duquesa de Osuna, una de las figuras más destacadas de la alta nobleza ilustrada en España. En 1783, la duquesa y su esposo, el IX duque de Osuna, adquirieron una finca de recreo en las afueras de Madrid, en el camino de Aragón, en lo que hoy es el barrio de Alameda de Osuna. En esta propiedad ya existía una casa de campo típica de la época, que fue ampliada y transformada para convertirse en un elegante palacio de descanso estival y lugar de encuentro cultural. María Josefa, profundamente influenciada por las corrientes intelectuales de la Ilustración y los modelos paisajísticos franceses e ingleses, concibió un conjunto único donde la arquitectura y la naturaleza se integraban armoniosamente. Encargó la intervención de reconocidos arquitectos y paisajistas como Jean Baptiste Mulot y Pierre Provost para diseñar los jardines y las estructuras que animarían el entorno, transformando la finca en un jardín romántico con caminos serpenteantes, bosques, lagos y edificios singulares.'
        },
        EN: {
            video: '/videos/RehabilitacionCapricho copia.mp4',
            text: 'Explanatory text about the origins of the houses.'
        }
    },
    item2: {
        ES: {
            video: '/videos/RehabilitacionCapricho.mp4',
            text: 'Texto sobre los IX Duques.'
        },
        EN: {
            video: '/videos/RehabilitacionCapricho.mp4',
            text: 'Text about the IX Dukes.'
        }
    },
    item3: {
        ES: {
            video: '/videos/RehabilitacionCapricho.mp4',
            text: 'Texto explicativo sobre la biografía familiar.'
        },
        EN: {
            video: '/videos/RehabilitacionCapricho.mp4',
            text: 'Explanatory text about the family biography.'
        }
    },
    item4: {
        ES: {
            video: '/videos/RehabilitacionCapricho.mp4',
            text: 'Texto explicativo sobre el album familiar.'
        },
        EN: {
            video: '/videos/RehabilitacionCapricho.mp4',
            text: 'Explanatory text about the family album.'
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
