import "./style.css";
import { SceneManager } from "./scene/SceneManager";
import { Orb } from "./scene/Orb";

const container = document.getElementById("app") as HTMLDivElement;
const sceneManager = new SceneManager(container);
const orb = new Orb();
let time = 0;
sceneManager.add(orb);

function animate() {
  requestAnimationFrame(animate);

  time += 0.01;
  orb.scale.setScalar(1 + Math.sin(time) * 0.05);

  sceneManager.render();
}

animate();
