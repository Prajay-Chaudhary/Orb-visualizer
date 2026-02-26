import * as THREE from "three";
import vertexShader from "./shaders/orb.vertex.glsl?raw";
import fragmentShader from "./shaders/orb.fragment.glsl?raw";

export class Orb extends THREE.Mesh {
  private static readonly RADIUS = 1.6;

  constructor() {
    const geometry = new THREE.SphereGeometry(Orb.RADIUS, 128, 128);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0.1 },
      },
      vertexShader,
      fragmentShader,
    });
    super(geometry, material);
  }

  public update(time: number, score: number): void {
    const mat = this.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = time;
    mat.uniforms.uIntensity.value = (100 - score) / 60.0;
  }
}
