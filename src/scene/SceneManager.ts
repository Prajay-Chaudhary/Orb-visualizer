import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { StarField } from "./StarField";

export class SceneManager {
  private scene = new THREE.Scene();
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private camera: THREE.PerspectiveCamera;

  constructor(container: HTMLElement) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    this.camera.position.z = 6;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    container.appendChild(this.renderer.domElement);

    this.composer = new EffectComposer(this.renderer);
    this.setupPostProcessing(container);
    this.scene.add(new StarField());
  }

  private setupPostProcessing(container: HTMLElement): void {
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.8,
      0.7,
      0.1,
    );
    this.composer.addPass(bloomPass);
  }

  public add(obj: THREE.Object3D): void {
    this.scene.add(obj);
  }

  public render(): void {
    this.composer.render();
  }
}
