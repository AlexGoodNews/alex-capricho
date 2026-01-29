/// <reference path="../types/index.d.ts" />

import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"


let model


// Escena
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf5f5f5) // gris MUY claro


// Cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(-225.0, 129.0, 10.0)
camera.rotation.set(-0.820, 0.450, 0.0)


// Renderizador
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0



//controles
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.target.set(0, 0, 0)
controls.enabled = false

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 0.3))

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
dirLight.position.set(5, 10, 5)
dirLight.castShadow = true
scene.add(dirLight)

//paraRaytracing
const floors = [];


// Modelo
const loader = new GLTFLoader()
loader.load("/3d/models/caprichoThreeJS.glb", (gltf) => {
  model = gltf.scene


  //-----------------------Movida para que el objeto venga hacia la direccion que apunta la camara reversed (hacia a mi)------------------
  //Dirección de la cámara
  const cameraDir = new THREE.Vector3()
  camera.getWorldDirection(cameraDir)

  // Posición final
  const finalPosition = new THREE.Vector3(0, 0, 0)

  // Posición inicial: detrás del punto final, respecto a la cámara
  const startPosition = finalPosition.clone().add(
    cameraDir.clone().multiplyScalar(300)
  )

  model.position.copy(startPosition)
  model.userData.startPosition = startPosition
  model.userData.finalPosition = finalPosition
  model.userData.targetPosition = model.userData.finalPosition.clone()
  model.userData.targetRotationY = model.rotation.y
  model.userData.targetOpacity = 1
  //----------------------------------------------

  // Material, sombras, etc.
  model.traverse((child) => {
    if (child.isMesh) {
      child.geometry.computeVertexNormals()
      child.material = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.1,
        roughness: 0.8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0
      })
      child.castShadow = true
      child.receiveShadow = true
    }
  })



  //modelo 2 es el efecto cellsahding
  const outlineModel = model.clone();
  outlineModel.traverse((child) => {
    if (child.isMesh && !child.userData.isFloorTrigger) {
      child.material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.BackSide
      });
      child.userData.isOutline = true; // Marca este objeto como outline
    }
  });

  outlineModel.position.set(0, 0, 0)
  outlineModel.rotation.set(0, 0, 0)
  outlineModel.scale.copy(model.scale)
  outlineModel.scale.set(
    model.scale.x * 1.01,
    model.scale.y * 1.03,
    model.scale.z * 1.01
  )
  model.add(outlineModel)

  /*
  //tres cubos
  const cubeHeight = 10; 
  for (let i = 0; i < 3; i++) {
    const cubeGeo = new THREE.BoxGeometry(100, cubeHeight, 200); // ancho, alto, profundidad
    // Material transparente
    const cubeMat = new THREE.MeshStandardMaterial({ 
      color: 0xff0000, 
      transparent: true, 
      opacity: 0, // invisible por defecto
      depthWrite: false // para que no ocluya el museo
    });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.userData.isFloorTrigger = true; // identifica que es un cubo de interacción
    cube.material.opacity = 0;
    cube.material.transparent = true;
    cube.material.depthWrite = false;

    cube.position.set(0, cubeHeight / 2 + i * cubeHeight, 0);
    cube.userData.floor = i + 1; // guarda la planta
    cube.userData.url = `https://alex-capricho.pages.dev/pagina1`; // URL para redirigir

    model.add(cube);
    //floors.push(cube);
  }
  //floors.push(model);

  */
  //floors.push(model);

  scene.add(model)
  startIntroAnimation()
})

//raycasting

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


//ir a web clicl
window.addEventListener('mousemove', (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
});


window.addEventListener('click', () => {
  if (INTERSECTED) {
    const url = INTERSECTED.userData.url;
    if (url) window.open(url, '_blank');
  }
});


let INTERSECTED = null;
const HOVER_COLOR = new THREE.Color(0x00ff00); // Color de hover (puedes cambiarlo a cualquier color que desees)
const DEFAULT_COLOR = new THREE.Color(0x888888); // Color por defecto
function checkIntersections() {
  if (!model) return; // ← evita el error
  raycaster.setFromCamera(pointer, camera);
  //const intersects = raycaster.intersectObjects(floors, true); //false para la opcion de los tres cubos
  const intersects = raycaster.intersectObject(model, true); 

  /* --- old code 3 blocks----------
  if (intersects.length > 0) {
    const hovered = intersects[0].object;
    if (INTERSECTED !== hovered) {
      if (INTERSECTED) INTERSECTED.material.opacity = 0; // vuelve invisible el anterior
      INTERSECTED = hovered;
      INTERSECTED.material.opacity = 0.3; // hover semi-transparente
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.opacity = 0; // vuelve invisible
    INTERSECTED = null;
  }*/


  if (intersects.length > 0) {
    const hovered = intersects[0].object;

    // Ignorar la intersección si el objeto es parte del modelo de outline (negro)
    if (hovered.userData.isOutline) {
      return;
    }

    if (INTERSECTED !== hovered) {
      if (INTERSECTED) {
        // Restaura el color del objeto previamente interactuado
        INTERSECTED.material.color.set(DEFAULT_COLOR);
      }

      INTERSECTED = hovered;

      // Cambia el color del objeto al color de hover
      INTERSECTED.material.color.set(HOVER_COLOR);
    }
  } else {
    if (INTERSECTED) {
      // Restaura el color al color por defecto si no hay intersección
      INTERSECTED.material.color.set(DEFAULT_COLOR);
      INTERSECTED = null;
    }
  }
}



//--------------------------Pre animacion----------
let introActive = false

//giro en grados intro
const introTargetRotation = THREE.MathUtils.degToRad(360)

function startIntroAnimation() {
  introActive = true

  model.userData.targetPosition = model.userData.finalPosition.clone()
  model.userData.targetRotationY =
    model.rotation.y + introTargetRotation
  model.userData.targetOpacity = 1
}

// Animación
function animate() {
  requestAnimationFrame(animate)
  
  const SMOOTH = 0.08

  if (introActive && model) {

    
    // Posición (viene hacia cámara)
    model.position.lerp(
      model.userData.targetPosition,
      SMOOTH
    )

    // Rotación tipo "tile flip"
    model.rotation.y = THREE.MathUtils.lerp(
      model.rotation.y,
      model.userData.targetRotationY,
      SMOOTH
    )

    // Fade-in con la misma inercia
    model.traverse((child) => {
      if (child.isMesh && !child.userData.isFloorTrigger) {
        child.material.opacity = THREE.MathUtils.lerp(
          child.material.opacity,
          model.userData.targetOpacity,
          SMOOTH
        );
      }
    });


    // Condición de parada
    const posDone =
      model.position.distanceTo(model.userData.targetPosition) < 0.5
    const rotDone =
      Math.abs(model.rotation.y - model.userData.targetRotationY) < 0.001

    if (posDone && rotDone) {
      introActive = false
    }
  }

  if (model && !introActive) {
    model.rotation.y += 0.001
  }


  //raycasting
  checkIntersections();
  
  renderer.render(scene, camera) //cambiado composer por outline
  //composer.render()
  controls.update()
}

animate()


window.addEventListener("resize", onWindowResize)

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}
/*
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
*/

