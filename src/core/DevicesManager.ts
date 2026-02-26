import * as THREE from "three";
import { DeviceRing } from "./DeviceRing";

export class DevicesManager extends THREE.Group {
  private rings: DeviceRing[] = [];
  private readonly RING_START_RADIUS = 1.72;
  private readonly RING_GAP = 0.05;

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

  public tick(delta: number): void {
    this.rings.forEach((ring) => ring.tick(delta));
  }
}
