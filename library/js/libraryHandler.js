// Datos para cada idioma
const contentData = {
    item1: {
        ES: {
            video: 'videos/PIEZA_13_AV1_v1.mp4',
            text: 'La Biblioteca Osuna-Infantado fue una de las mayores colecciones privadas de Europa, reunida por los duques de Osuna e Infantado. Llegó a tener unos 35.000 impresos y más de 4.000 manuscritos, con obras del Siglo de Oro, códices medievales, incunables y joyas como la Biblia Políglota Complutense. Tras la muerte del XII duque de Osuna en 1882, se temió su dispersión, pero en 1884 el Estado la compró por 900.000 pesetas. Lo más valioso pasó a la Biblioteca Nacional y el resto se repartió entre otras instituciones, convirtiendo así una biblioteca aristocrática en patrimonio de toda la nación.'
        },
        EN: {
            video: 'videos/PIEZA_13_AV1_v1_engSUB.mp4',
            text: 'The Osuna-Infantado Library was one of the largest private collections in Europe, assembled by the Dukes of Osuna and Infantado. It comprised approximately 35,000 printed volumes and over 4,000 manuscripts, featuring works from the Spanish Golden Age, medieval codices, incunabula, and treasures such as the Complutensian Polyglot Bible. Following the death of the 12th Duke of Osuna in 1882, there were fears the collection would be dispersed; however, in 1884, the State purchased it for 900,000 pesetas. The most valuable items were transferred to the National Library, while the remainder was distributed among other institutions, thereby transforming an aristocratic library into the heritage of the entire nation.'
        }
    },
    item2: {
        ES: {
            video: 'videos/PIEZA_13_AV2_v1.mp4',
            text: 'La biblioteca de los duques de Osuna fue una de las primeras bibliotecas privadas abiertas al público. Creada en 1786 bajo el noveno duque, tuvo sedes en los palacios de la Cuesta de la Vega, Leganitos y las Vistillas. Atrajo a intelectuales como Moratín y fue elogiada por Humboldt, con ocho bibliotecarios y 60.000 reales anuales para compras. Gracias a una red de libreros y contactos diplomáticos, se convirtió en una ventana a Europa, con obras en varios idiomas pese a las restricciones de la Inquisición.'
        },
        EN: {
            video: 'videos/PIEZA_13_AV2_v1_engSUB.mp4',
            text: 'The library of the Dukes of Osuna was one of the first private libraries to be opened to the public. Established in 1786 under the ninth Duke, it was housed at various times in the palaces of Cuesta de la Vega, Leganitos, and Las Vistillas. It attracted intellectuals such as Moratín and won praise from Humboldt, boasting a staff of eight librarians and an annual acquisitions budget of 60,000 reales. Thanks to a network of booksellers and diplomatic contacts, it served as a window onto Europe, featuring works in multiple languages ​​despite the restrictions imposed by the Inquisition.'
        }
    },
    item3: {
        ES: {
            video: 'videos/PIEZA_13_AV3_v1.mp4',
            text: 'María Josefa Pimentel, duquesa de Osuna, fue una gran figura de la Ilustración española. Su biblioteca, marcada con el supralibros «Pimentel» y la etiqueta «C», reunió unos diez mil volúmenes, de los que se conservan unas quinientas obras impresas y una docena de manuscritos. Pensada para el uso cotidiano, abarcaba agricultura, derecho, astronomía, historia, arte, ciencias y educación, con especial atención a la formación femenina. La literatura ocupaba un lugar central, con autores como Walter Scott o Washington Irving, y un notable interés por escritoras como Madame de Genlis o Madame de Sévigné. También incluía obras ilustradas, científicas y sobre la Revolución francesa, además de grabados, mapas y ediciones de los Caprichos de Goya. En conjunto, refleja a una mujer ilustrada y cosmopolita comprometida con el conocimiento.'
        },
        EN: {
            video: 'videos/PIEZA_13_AV3_v1_engSUB.mp4',
            text: 'María Josefa Pimentel, Duchess of Osuna, was a prominent figure of the Spanish Enlightenment. Her library—marked with the "Pimentel" supralibros and the "C" label—comprised some ten thousand volumes, of which about five hundred printed works and a dozen manuscripts have survived. Intended for daily use, the collection covered agriculture, law, astronomy, history, art, the sciences, and education, with a particular focus on the education of women. Literature held a central place, featuring authors such as Walter Scott and Washington Irving, alongside a notable interest in female writers like Madame de Genlis and Madame de Sévigné. The collection also included illustrated and scientific works, material on the French Revolution, and prints, maps, and editions of Goya’s *Caprichos*. Overall, it reflects the image of an enlightened, cosmopolitan woman dedicated to the pursuit of knowledge.'
        }
    },
    item4: {
        ES: {
            video: '../videos/RehabilitacionCaprichoQR.png',
            text: 'Acceso al catálogo nacional de España'
        },
        EN: {
            video: '../videos/RehabilitacionCapricho.mp4',
            text: 'Access to Spain\'s national catalog'
        }
    },
    item5: {
        ES: {
            video: 'videos/PIEZA_13_AV4_v1.mp4',
            text: 'El Archivo de los duques de Osuna es uno de los fondos nobiliarios más importantes de Europa y una historia de supervivencia. Reunió documentos de linajes como Osuna, Benavente, Lerma o Infantado, y de familias europeas como los Colonna, abarcando del siglo XII al XIX. Estuvo a punto de perderse: un incendio en Benavente destruyó parte durante la guerra de la Independencia y, en 1894, una sentencia lo adjudicó a los acreedores de la casa ducal, que separaron los documentos más codiciados. El British Museum llegó a ofrecer cerca de un millón de pesetas por él. Sobrevivió: en 1917 ingresó en el Archivo Histórico Nacional y en 1927 el Estado lo compró por 200.000 pesetas gracias al donativo del duque de Almenara Alta. Su historia no se entiende sin el benedictino Liciniano Sáez, que dedicó dieciséis años a reorganizarlo por encargo de María Josefa Pimentel.'
        },
        EN: {
            video: 'videos/PIEZA_13_AV4_v1_engSUB.mp4',
            text: 'The Archive of the Dukes of Osuna is one of Europe’s most important noble archives and a story of survival. It brought together documents from lineages such as Osuna, Benavente, Lerma, and Infantado, as well as European families like the Colonnas, spanning the 12th to the 19th centuries. It came close to being lost: a fire in Benavente destroyed part of it during the Peninsular War, and in 1894, a court ruling awarded it to the ducal house creditors, who separated out the most coveted documents. The British Museum even offered nearly a million pesetas for it. It survived: in 1917, it was transferred to the National Historical Archive, and in 1927, the State purchased it for 200,000 pesetas, thanks to a donation from the Duke of Almenara Alta. Its history cannot be understood without the Benedictine monk Liciniano Sáez, who spent sixteen years reorganizing it at the behest of María Josefa Pimentel.'
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