import { TILE_SIZE } from "../../../../game/constants";
import EntityHandler from "../../../../utils/EntityHandler";
import Enemy from "../Enemy";

export default class Bat extends Enemy {
  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(32, 16);

    this.vel.set(30, 0);

    this.dir.set(
      (Math.random() > 0.5 ? 1 : -1),
      1
    );

    this.exp = 3;
    this.stats.atk = 3;
    this.frameDelay = 0.2;

    if (this.dir.x === 1)       this.setFrames(68, 70);
    else if (this.dir.x === -1) this.setFrames(69, 71);
  }

  init() {}

  update(dt) {
    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * this.dir.y * dt;

    // Check game world collisions
    if (nextx + this.dst.w >= 120) {
      nextx = 112;
      this.dir.x = -1;
      nexty += TILE_SIZE>>1;
      this.vel.x += 5;
      this.setFrames(69, 71);
    }
    else if (nextx <= 8) {
      nextx = 8;
      this.dir.x = 1;
      nexty += TILE_SIZE>>1;
      this.vel.x += 5;
      this.setFrames(68, 70);
    }

    if (nexty >= 56) EntityHandler.remove(this);

    this.dst.x = nextx;
    this.dst.y = nexty;

    this.animate(dt);
  }
};