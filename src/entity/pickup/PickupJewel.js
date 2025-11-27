import { GRAVITY } from "../../math/constants";
import Vec2D from "../../math/Vec2D";
import Pickup from "./Pickup";

export default class PickupJewel extends Pickup {
  #type;
  #value; // How much the jewel is worth

  constructor(x=0, y=0, type=0) {
    super(x, y);

    this.#type = type;

    this.frameDelay = 0.15;

    this.dir = Vec2D.angToVec(
      Math.random() >= 0.5 ? 4.1887 : 5.2359
    );
    this.dir.normalize();

    this.vel.set(
      Math.floor(Math.random() * ( 20 - 10)) + 10,
      Math.floor(Math.random() * (100 - 70)) + 70
    );

    switch(this.#type) {
      case 0:
        this.src.set(0, 160);
        this.setFrames(640, 641);
        this.#value = 1;
        break;
      case 1:
        this.src.set(16, 160);
        this.setFrames(642, 643)
        this.#value = 3;
        break;
      case 2:
        this.src.set(32, 160);
        this.setFrames(644, 645)
        this.#value = 3;
        break;
    }
  }

  init() {}

  update(dt) {
    this.vel.y += -GRAVITY * dt;

    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * this.dir.y * dt;

    if (nextx <= 8) nextx = 8;
    else if (nextx >= 112) nextx = 112;

    if (nexty >= 40) {
      nexty = 40;
      this.vel.x = 0;
      this.vel.y = 20;
    }

    this.dst.set(nextx, nexty);

    this.animate(dt);
  }

  // Accessors
  get value() { return this.#value; }
};