let pos = 0;
let animationId = null;

export function startScroll(selector = ".activities-track") {

    const track = document.querySelector(selector);

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

        if (track.scrollHeight <= container.clientHeight) {
            console.log("No hay overflow, no se inicia scroll");
            return;
        }

        const originalHTML = track.innerHTML;

        track.innerHTML = originalHTML + originalHTML;

        const scrollHeight = track.scrollHeight / 2;

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