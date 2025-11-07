import { GRAVITY } from "../../../math/constants";
import EntityHandler from "../../../utils/EntityHandler";
import Particle from "./Particle";

export default class ParticleSlime extends Particle {
  constructor(x=0, y=0, angle=0) {
    super(x, y, angle);

    this.dir.normalize();

    this.dst.w = 4;
    this.dst.h = 4;

    this.stats.hp = 2;

    this.vel.set(
      Math.floor(Math.random() * ( 20 - 10)) + 10,
      Math.floor(Math.random() * (100 - 70)) + 70
    );

    this.src.set(0, 24, 4, 4);
  }

  update(dt) {
    this.vel.y += -GRAVITY * dt;

    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * this.dir.y * dt;

    if (nexty >= 44) {
      nexty = 44;
      --this.stats.hp;
      this.vel.y = 30;

      if (this.stats.hp <= 0) EntityHandler.remove(this);
    }

    this.dst.set(nextx, nexty, 4, 4);
  }
};