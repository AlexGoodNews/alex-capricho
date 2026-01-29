import * as THREE from "three";

let floorViewActive = false;
export let activeFloor = null;

let savedCameraPosition = null;
let savedCameraRotation = null;

let transitionStartTime = null;
const transitionDuration = 1.5;  // Duración de la transición en segundos

export let cameraTransitionActive = false;
let cameraTargetPosition = new THREE.Vector3();
let cameraTargetQuaternion = new THREE.Quaternion();

export function isFloorViewActive() {
    return floorViewActive;
}

export function updateCameraTransition(camera) {
    if (!cameraTransitionActive) return;

    const SMOOTH = 0.08;

    // Si la animación acaba de comenzar, marcar el tiempo de inicio
    if (transitionStartTime === null) {
        transitionStartTime = performance.now();  // Tiempo actual en milisegundos
    }

    // Interpolar posición
    camera.position.lerp(cameraTargetPosition, SMOOTH);

    // Comprobar si ha pasado el tiempo suficiente para terminar la animación
    const elapsedTime = (performance.now() - transitionStartTime) / 1000;  // Tiempo en segundos

    if (elapsedTime >= transitionDuration) {
        // La transición ha terminado, detener la animación
        cameraTransitionActive = false;
        // Reactivar los botones cuando termine la transición
        document.querySelectorAll(".floor-btn").forEach(btn => {
            btn.disabled = false;
        });
        // Reiniciar el temporizador para la siguiente transición
        transitionStartTime = null;  

    } else {
        // La cámara sigue moviéndose, aseguramos que los botones estén desactivados
        document.querySelectorAll(".floor-btn").forEach(btn => {
            btn.disabled = true;
        });
    }

}

export function activateFloorView(model, camera, floorNumber) {
    // Si ya estamos en esta planta, no hacer nada
    if (activeFloor === floorNumber) return;

    floorViewActive = true;
    activeFloor = floorNumber;

    // Guardar cámara
    savedCameraPosition = camera.position.clone();
    savedCameraRotation = camera.rotation.clone();

    // Parar rotación infinita
    model.userData.stopRotation = true;

    // Colocar modelo en posición fija necesatio sino el modelo sale rotado por la rotacion continua
    model.rotation.set(0, 0, 0);
    model.position.set(0, 0, 0);

    // --- NUEVO: definir target de cámara según planta ---
    const btn1 = document.getElementById("btnPlanta1");
    const btn2 = document.getElementById("btnPlanta2");
    if (floorNumber === 1) {
        cameraTargetPosition.set(-47.875, 4.293, 30.365);
        btn1.textContent = "Volver";
        btn1.classList.add("return-mode");

        btn2.textContent = "Planta 2";
        btn2.classList.remove("return-mode");
    }
    if (floorNumber === 2) {
        cameraTargetPosition.set(-37.875, 25, -111.3);
        btn2.textContent = "Volver";
        btn2.classList.add("return-mode");

        btn1.textContent = "Planta 1";
        btn1.classList.remove("return-mode");
    }
    cameraTransitionActive = true;
}

export function restoreNormalView(model, mainViewPosition, mainViewRotation) {
    if (!floorViewActive) return;

    floorViewActive = false;

    const floorToRestore = activeFloor;

    // Restaurar cámara a la vista principal usando la cámara original
    cameraTargetPosition.copy(mainViewPosition);
    const q = new THREE.Quaternion();
    q.setFromEuler(mainViewRotation);
    cameraTargetQuaternion.copy(q);

    cameraTransitionActive = true;

    // Volver a rotación infinita
    model.userData.stopRotation = false;

    // Restaurar todos los botones
    document.getElementById("btnPlanta1").textContent = "Planta 1";
    document.getElementById("btnPlanta1").classList.remove("return-mode");

    document.getElementById("btnPlanta2").textContent = "Planta 2";
    document.getElementById("btnPlanta2").classList.remove("return-mode");

    // reseteamos activeFloor
    activeFloor = null;
}
