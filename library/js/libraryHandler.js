// Datos para cada idioma
const contentData = {
    item1: {
        ES: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Descripcion Demostrativa.'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho copia.mp4',
            text: 'Explanatory text.'
        }
    },
    item2: {
        ES: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Descripcion Demostrativa.'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Explanatory text.'
        }
    },
    item3: {
        ES: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Descripcion Demostrativa.'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Explanatory text.'
        }
    },
    item4: {
        ES: {
            video: '../videos/RehabilitacionCaprichoQR.png',
            text: 'Descripcion Demostrativa.'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Explanatory text'
        }
    },
    item5: {
        ES: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Descripcion Demostrativa.'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Explanatory text'
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

//cargar los videos y QR
document.querySelectorAll('.item').forEach(item => {

    if (item.classList.contains('noVideo')) return;

    const itemId = item.dataset.item;
    const data = contentData[itemId][DEFAULT_LANG];

    if (!data) return;

    const text = item.querySelector('.contentText');

    // ITEM QR
    if (itemId === 'item4') {
        const qrImage = item.querySelector('.qrWrapper img');

        if (qrImage && data.qr) {
            qrImage.src = data.qr;
        }

        text.textContent = data.text;
        return;
    }

    // ITEMS CON VIDEO
    const video = item.querySelector('video');
    const source = video.querySelector('source');

    if (!video || !source) return;

    // Cargar contenido inicial
    source.src = data.video;

    video.load();
    video.pause();

    const wrapper = item.querySelector('.videoWrapper');

    if (wrapper) {
        wrapper.classList.remove('playing');
        wrapper.classList.add('paused');
    }

    text.textContent = data.text;
});


const items = document.querySelectorAll('.item');

//Para pausar el video cuando entras y sales
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