import * as THREE from "three";

export function createRaycaster() {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    });

    return { raycaster, pointer };
}

// --- Función de raycasting segura ---
let INTERSECTED = null;
export function checkIntersections(model, raycaster, pointer, camera) {
  if (!model) return;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObject(model, true);

  let hovered = null;
  for (let i = 0; i < intersects.length; i++) {
    if (!intersects[i].object.userData.isOutline) { // ignoramos outline
      hovered = intersects[i].object;
      break;
    }
  }

  if (hovered) {
    if (INTERSECTED !== hovered) {
      if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.userData.originalColor);
      INTERSECTED = hovered;
      INTERSECTED.userData.originalColor = INTERSECTED.material.color.getHex();
      INTERSECTED.material.color.set(0xff0000); // hover color
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.userData.originalColor);
    INTERSECTED = null;
  }
}
