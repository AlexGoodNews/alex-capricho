let pos = 0;
let animationId = null;

export function startScroll(selector = ".activities-track") {

    console.log("startScroll() llamado");

    const track = document.querySelector(selector);

    console.log("track encontrado:", track);

    if (!track) {
        console.log("No existe el elemento");
        return;
    }

    if (animationId) {
        console.log("Cancelando animación anterior");
        cancelAnimationFrame(animationId);
    }

    pos = 0;

    setTimeout(() => {

        const container = document.querySelector(".activities");
        console.log("scrollHeight:", track.scrollHeight);
        console.log("clientHeight:", track.clientHeight);
        console.log(track);
        console.log(track.parentElement);
        console.log(track.parentElement.clientHeight);

        if (track.scrollHeight <= container.clientHeight) {
            console.log("No hay overflow, no se inicia scroll");
            return;
        }

        const originalHTML = track.innerHTML;

        console.log("Longitud HTML:", originalHTML.length);

        track.innerHTML = originalHTML + originalHTML;

        const scrollHeight = track.scrollHeight / 2;

        console.log("scrollHeight calculado:", scrollHeight);

        function animate() {

            pos -= 0.5;

            track.style.transform = `translateY(${pos}px)`;

            if (Math.abs(pos) >= scrollHeight) {
                console.log("Reiniciando scroll");
                pos = 0;
            }

            animationId = requestAnimationFrame(animate);
        }

        console.log("Animación iniciada");

        animate();

    }, 50);
}