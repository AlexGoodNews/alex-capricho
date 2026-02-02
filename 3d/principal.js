import * as THREE from "three";

import { createCamera } from './camera.js';
import { createScene } from './scene.js';
import { loadModel } from './model.js';
import { createRenderer } from './renderer.js';
import { createControls } from './controls.js';
import { createRaycaster, checkIntersections } from './raycaster.js';
import { activateFloorView, restoreNormalView, isFloorViewActive, updateCameraTransition, activeFloor} from "./floorView.js";


let model;
let introActive = false;
const introTargetRotation = THREE.MathUtils.degToRad(360);

// Crear la escena, cámara, renderizador y controles
const camera = createCamera();
const mainViewPosition = camera.position.clone();
const mainViewRotation = camera.rotation.clone();

const scene = createScene();
const renderer = createRenderer();
const controls = createControls(camera, renderer);
const { raycaster, pointer } = createRaycaster();

// --- CARGAR MODELO ---
loadModel('/3d/models/caprichoThreeJS1.glb', scene, camera).then((loadedModel) => {
    model = loadedModel;
    console.log("ver9");
    console.log("Posición cámara inciial", camera.position.toArray());

    
    animate();
});



// --- preparardatos DE ENTRADA ---
function prepareIntroAnimation() {
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);

    const finalPosition = new THREE.Vector3(0, 0, 0);
    const startPosition = finalPosition.clone().add(
        cameraDir.clone().multiplyScalar(300)
    );

    model.position.copy(startPosition);

    model.userData.startPosition = startPosition;
    model.userData.finalPosition = finalPosition;
    model.userData.targetPosition = finalPosition.clone();
    model.userData.targetRotationY = model.rotation.y + introTargetRotation;
    model.userData.targetOpacity = 1;

    introActive = true;
}
function runIntroAnimation() {
    const SMOOTH = 0.08;

    //move
    model.position.lerp(model.userData.targetPosition, SMOOTH);

    //flip
    model.rotation.y = THREE.MathUtils.lerp(
        model.rotation.y,
        model.userData.targetRotationY,
        SMOOTH
    );
    //fade in opacidad 0 a 1
    model.traverse((child) => {
        if (child.isMesh && !child.userData.isFloorTrigger) {
            child.material.opacity = THREE.MathUtils.lerp(
                child.material.opacity,
                model.userData.targetOpacity,
                SMOOTH
            );
        }
    });

    //end? then stop
    const posDone = model.position.distanceTo(model.userData.targetPosition) < 0.5;
    const rotDone = Math.abs(model.rotation.y - model.userData.targetRotationY) < 0.001;
    

    if (posDone && rotDone) {
        introActive = false;

        const btn1 = document.getElementById("btnPlanta1");
        btn1.classList.remove("hidden");
        btn1.classList.add("visible");

        const btn2 = document.getElementById("btnPlanta2");
        btn2.classList.remove("hidden");
        btn2.classList.add("visible");
    }

}

let introStarted = false;
// --- ANIMACIÓN PRINCIPAL ---
function animate() {

    requestAnimationFrame(animate)
    // Lanzar intro SOLO UNA VEZ 
    if (!introStarted && model) { 
        introStarted = true; 
        prepareIntroAnimation(); 
    }

    // Ejecutar animación de entrada 
    if (introActive) { 
        runIntroAnimation();
    }
    updateCameraTransition(camera);

    if (!introActive && !isFloorViewActive() && model && !model.userData.stopRotation) { 
        model.rotation.y += 0.001; 
    }

    //raycasting
    //checkIntersections(model,raycaster, pointer, camera);

    renderer.render(scene, camera)
    controls.update()
}
// --- EVENTOS ---
window.addEventListener("resize", onWindowResize)

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener("keydown", (e) => {
    if (e.key === "d") {
        console.log(
            `camera.position.set(${camera.position.x.toFixed(3)}, ${camera.position.y.toFixed(3)}, ${camera.position.z.toFixed(3)})`
        )
        console.log(
            `camera.rotation.set(${camera.rotation.x.toFixed(3)}, ${camera.rotation.y.toFixed(3)}, ${camera.rotation.z.toFixed(3)})`
        )
    }
})

// Botones de pisos

const btn1 = document.getElementById("btnPlanta1");
btn1.classList.add("hidden");
const btn2 = document.getElementById("btnPlanta2");
btn2.classList.add("hidden");

document.getElementById("btnPlanta1").addEventListener("click", () => {
    if (isFloorViewActive() && activeFloor === 1) {
        restoreNormalView(model, mainViewPosition, mainViewRotation);
    } else {
        activateFloorView(model, camera, 1);
    }
});

document.getElementById("btnPlanta2").addEventListener("click", () => {
    if (isFloorViewActive() && activeFloor === 2) {
        restoreNormalView(model, mainViewPosition, mainViewRotation);
    } else {
        activateFloorView(model, camera, 2);
    }
});

function enableTouchFeedback(selector) {
    const btn = document.getElementById(selector);
    if (!btn) return;

    btn.addEventListener("touchstart", () => {
        btn.classList.add("pressed");
    });

    btn.addEventListener("touchend", () => {
        btn.classList.remove("pressed");
    });

    btn.addEventListener("touchcancel", () => {
        btn.classList.remove("pressed");
    });
}

// Activamos feedback táctil en tus botones
enableTouchFeedback("btnPlanta1");
enableTouchFeedback("btnPlanta2");
