import * as THREE from "three";

export class StarField extends THREE.Group {
  constructor() {
    super();
    this.add(this.createNebula());
    this.add(this.createRim());
  }

  private createNebula(): THREE.Points {
    const geo = new THREE.BufferGeometry();
    const count = 15000;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    return new THREE.Points(geo, mat);
  }

  private createRim(): THREE.Points {
    const geo = new THREE.BufferGeometry();
    const count = 1000;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      if (Math.random() > 0.5) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const r = 1.62 + Math.random() * 0.2;
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
      } else {
        pos[i * 3] = (Math.random() - 0.5) * 25;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
        pos[i * 3 + 2] = Math.random() * 4 + 1;
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.01,
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(geo, mat);
    stars.renderOrder = 999;
    return stars;
  }
}
