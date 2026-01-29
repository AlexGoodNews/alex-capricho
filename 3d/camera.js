import * as THREE from 'three';

export function createCamera(){
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(-161.5, 88.5, 0);
    camera.rotation.set(-0.820, 0.450, 0.0);

    return camera;
}