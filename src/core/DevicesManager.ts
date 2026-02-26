import * as THREE from "three";
import { DeviceRing } from "./DeviceRing";

export class DevicesManager extends THREE.Group {
  private rings: DeviceRing[] = [];
  private readonly RING_START_RADIUS = 1.62;
  private readonly RING_GAP = 0.25;
  private readonly ROTATION_SPEED_BASE = 0.4;

  constructor(devices: number[]) {
    super();
    this.initializeRings(devices);
  }

  private initializeRings(devices: number[]): void {
    devices.forEach((value, index) => {
      const radius = this.RING_START_RADIUS + index * this.RING_GAP;
      const ring = new DeviceRing(radius, value);
      this.rings.push(ring);
      this.add(ring);
    });
  }

  public update(values: number[]): void {
    values.forEach((v, i) => this.rings[i]?.update(v));
  }

  public tick(
    delta: number,
    orbOscillation: number = 1.0,
    score: number = 72,
  ): void {
    const agitationMultiplier = 1.0 + (1.0 - score / 100);

    this.rings.forEach((ring, index) => {
      const speedDirection = index % 2 === 0 ? 1 : -1;
      const speedMultiplier =
        (1.0 - index * 0.1) * speedDirection * agitationMultiplier;
      const glow = index === 0 ? orbOscillation : 1.0;

      ring.tick(delta * this.ROTATION_SPEED_BASE * speedMultiplier, glow);

      if (index === 0) {
        const scale = 1.0 + (orbOscillation - 1.0) * 0.05;
        ring.scale.set(scale, scale, 1);
      }
    });
  }
}
