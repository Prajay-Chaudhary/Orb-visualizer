import * as THREE from "three";
import "./style.css";
import { SceneManager } from "./scene/SceneManager";
import { Orb } from "./scene/Orb";
import { DevicesManager } from "./core/DevicesManager";

const container = document.getElementById("app") as HTMLDivElement;
const loader = document.getElementById("loader") as HTMLDivElement;
const overlay = document.querySelector(".ui-overlay") as HTMLElement;

const sceneManager = new SceneManager(container);
const clock = new THREE.Clock();
const orb = new Orb();
const devices = new DevicesManager([80, 60, 45]);
const centerScore = 72;

sceneManager.add(orb);
sceneManager.add(devices);

function revealApp() {
  if (loader) loader.style.opacity = "0";
  if (overlay) overlay.style.opacity = "1";
  setTimeout(() => loader?.remove(), 500);
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  orb.update(elapsed, centerScore);
  devices.tick(delta);
  sceneManager.render();

  if (elapsed > 0.1 && loader?.style.opacity !== "0") {
    revealApp();
  }
}

animate();
