import Player from "./Player";
import Sword  from "../../weapon/sword/Sword";

import { GRAVITY } from "../../../math/constants";

export default class PlayerChicken extends Player {
  constructor() {
    super();

    this.src.set(8, 0);

    this.stats.luck = 0.2;

    this.weapon = new Sword(this.dst.x+8, this.dst.y);

    this.price = 0;

    this.setFrames(1, 3);
  }

  update(dt) {
    this.handleInput([1, 3, 2, 4]);

    // Handle movement
    this.dir.normalize();

    this.vel.y += GRAVITY * dt;

    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * dt;

    // Considers weapon placement
    if (nextx <= 8 + 8)
      nextx = 8 + 8;
    else if (nextx >= 112 - 8)
      nextx = 112 - 8;

    if (nexty >= 40) {
      nexty = 40;
      this.vel.y = 0;
      this.isGrounded = true;
      this.isJumping  = false;
    }

    this.dst.set(nextx, nexty);

    this.handleEntityCollisions(dt, "chicken");

    this.weapon.update(this, dt);
    this.animate(dt);
  }

  draw() {
    super.draw();
    this.weapon.draw();
  }
};