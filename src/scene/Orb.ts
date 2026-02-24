import * as THREE from "three";

export class Orb extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.SphereGeometry(1, 128, 128);

    const material = new THREE.MeshStandardMaterial({
      color: 0x8844ff,
      roughness: 0.3,
      metalness: 0.5,
    });

    super(geometry, material);
  }
}
