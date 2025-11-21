import { GAME_WIDTH } from "../../../../game/constants";
import EntityHandler from "../../../../utils/EntityHandler";
import Enemy from "../Enemy";

export default class Squid extends Enemy {
  #freq; // Frequency for y sine movement

  constructor(x=0, y=0) {
    super(x, y);

    this.#freq = 0;

    this.src.set(64, 16);

    this.vel.set(40, 0);

    this.exp = 2;
    this.stats.atk = 3;
    this.dir.x = x === 0 ? 1 : -1;

    this.frameDelay = 0.1;

    if (this.dir.x === 1)       this.setFrames(72, 74);
    else if (this.dir.x === -1) this.setFrames(73, 75);
  }

  init() {}

  update(dt) {
    this.#freq += dt * 0.5;

    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = 10 * Math.sin(18 * this.#freq) + 28;

    // Remove if out of play area
    if (
      this.dir.x === -1 && nextx <= -this.dst.w ||
      this.dir.x ===  1 && nextx >= GAME_WIDTH
    ) EntityHandler.remove(this);

    this.dst.x = nextx;
    this.dst.y = nexty;

    this.animate(dt);
  }
};