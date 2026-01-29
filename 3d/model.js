import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadModel(url, scene, camera) {
    return new Promise((resolve) => {
        const loader = new GLTFLoader();
        loader.load(url, (gltf) => {
            const model = gltf.scene;

            // Material, sombras, etc.
            model.traverse((child) => {
                if (child.isMesh) {
                child.geometry.computeVertexNormals()
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x888888,
                    metalness: 0.1,
                    roughness: 0.8,
                    //side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0
                })
                child.castShadow = true
                child.receiveShadow = true
                }
            })

            scene.add(model);
            resolve(model); 
        });
    });
}
