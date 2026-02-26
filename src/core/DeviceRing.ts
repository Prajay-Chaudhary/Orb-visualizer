import * as THREE from "three";
import vertexShader from "../scene/shaders/deviceRing.vertex.glsl?raw";
import fragmentShader from "../scene/shaders/deviceRing.fragment.glsl?raw";

export class DeviceRing extends THREE.Mesh {
  private static readonly RING_THICKNESS = 0.01;

  constructor(radius: number, progress: number) {
    const geometry = new THREE.RingGeometry(
      radius,
      radius + DeviceRing.RING_THICKNESS,
      158,
    );

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: progress / 100 },
        uColorWarm: { value: new THREE.Color("#e0b28a") },
        uColorLight: { value: new THREE.Color("#e9ce6d") },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
      vertexShader,
      fragmentShader,
    });

    super(geometry, material);
  }

  public update(progress: number): void {
    const mat = this.material as THREE.ShaderMaterial;
    mat.uniforms.uProgress.value = THREE.MathUtils.clamp(progress / 100, 0, 1);
  }

  public tick(delta: number): void {
    this.rotation.z += delta * 0.2;
  }
}
