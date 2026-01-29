/// <reference path="../types/index.d.ts" />
import * as THREE from 'three'

export function createScene(){
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 10, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);


    return scene

}