import * as THREE from "three";
import vertexShader from "../scene/shaders/deviceRing.vertex.glsl?raw";
import fragmentShader from "../scene/shaders/deviceRing.fragment.glsl?raw";

export class DeviceRing extends THREE.Mesh {
  private static readonly SEGMENTS = 158;
  private static readonly COLOR_WARM = "#ff9d00";
  private static readonly COLOR_LIGHT = "#f3d488";
  private static readonly BASE_THICKNESS = 0.022;

  constructor(radius: number, progress: number) {
    const geometry = new THREE.RingGeometry(
      radius,
      radius + DeviceRing.BASE_THICKNESS,
      DeviceRing.SEGMENTS,
    );

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: progress / 100 },
        uColorWarm: { value: new THREE.Color(DeviceRing.COLOR_WARM) },
        uColorLight: { value: new THREE.Color(DeviceRing.COLOR_LIGHT) },
        uGlowIntensity: { value: 1.0 },
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

  public tick(delta: number, glowValue: number = 1.0): void {
    const mat = this.material as THREE.ShaderMaterial;
    this.rotation.z += delta;
    mat.uniforms.uGlowIntensity.value = glowValue;
  }
}
