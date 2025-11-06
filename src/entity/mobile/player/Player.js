import KeyHandler from "../../../input/KeyHandler";
import { GRAVITY } from "../../../math/constants";
import Entity from "../../Entity";
import Sword from "../../weapon/sword/Sword";

export default class Player extends Entity {
  #weapon;

  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(8, 0);

    this.dir.set(1, 0);
    this.vel.set(40, 0);

    this.#weapon = new Sword(x+8, y);
  }

  init() {}

  update(dt) {
    if (KeyHandler.isDown("right"))     this.dir.x =  1;
    else if (KeyHandler.isDown("left")) this.dir.x = -1;

    if (KeyHandler.isDown("ActionA")) {
      if (this.isGrounded && !this.isJumping) {
        this.vel.y = -90;
        this.isJumping  = true;
        this.isGrounded = false;
      }
    }

    this.dir.normalize();

    this.vel.y += GRAVITY * dt;

    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * dt;

    if (nextx <= 8 + this.#weapon.dst.w)
      nextx = 8 + this.#weapon.dst.w;
    else if (nextx >= 112 - this.#weapon.dst.w)
      nextx = 112 - this.#weapon.dst.w;

    if (nexty >= 40) {
      nexty = 40;
      this.vel.y = 0;
      this.isGrounded = true;
      this.isJumping  = false;
    }

    this.dst.x = nextx;
    this.dst.y = nexty;

    this.#weapon.update(this, dt);
  }

  draw() {
    super.draw();
    this.#weapon.draw();
  }
};