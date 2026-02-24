import * as THREE from "three";

export class SceneManager {
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;

    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );

    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.handleResize);
  }

  public add(object: THREE.Object3D) {
    this.scene.add(object);
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  private handleResize = () => {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );
  };
}
