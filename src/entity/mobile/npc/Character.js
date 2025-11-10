import { GAME_HEIGHT, GAME_WIDTH } from "../../../game/constants";
import { GRAVITY } from "../../../math/constants";
import Entity from "../../Entity";

export default class Character extends Entity {
  #dirTimer;  // Timer for changing direction
  #dirDelay;  // Delay for changing direction

  #jumpTimer; // Timer for jumping
  #jumpDelay; // Delay for jumping

  #frames;    // Left and right frames container

  constructor(framesLeft=[], framesRight=[]) {
    super();

    this.#frames = [
      [ ...framesLeft ],
      [ ...framesRight ]
    ];

    this.dst.set(
      Math.floor(Math.random() * (108 - 8 + 1)) + 8,
      0
    );
    this.dir.set(
      Math.random() >= 0.5 ? 1 : -1,
      0
    );

    this.vel.x = Math.floor(Math.random() * (40 - 20 + 1)) + 20;

    this.frameDelay = 0.2;

    this.#dirTimer = 0;
    this.#dirDelay = 3;

    this.#jumpTimer = 0;
    this.#jumpDelay = 3;

    this.dir.x === 1 ?
      this.setFrames(this.#frames[0][0], this.#frames[0][1]) :
      this.setFrames(this.#frames[1][0], this.#frames[1][1]);
  }

  init() {}

  update(dt) {
    this.#dirTimer  += dt;
    this.#jumpTimer += dt;

    if (this.#dirTimer >= this.#dirDelay) {
      this.#dirTimer = 0;
      this.#dirDelay = Math.random() * 3 + 1;

      this.dir.x *= -1;

      this.dir.x === 1 ?
        this.setFrames(this.#frames[0][0], this.#frames[0][1]) :
        this.setFrames(this.#frames[1][0], this.#frames[1][1]);
    }

    if (this.#jumpTimer >= this.#jumpDelay) {
      this.#jumpTimer = 0;
      this.#jumpDelay = Math.random() * 3;

      if (this.isGrounded && !this.isJumping) {
        this.vel.y = -90;
        this.isJumping  = true;
        this.isGrounded = false;
      }
    }

    this.vel.y += GRAVITY * dt;

    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * dt;

    if (nextx <= 0) nextx = 0;
    else if (nextx >= GAME_WIDTH - this.dst.w) nextx = GAME_WIDTH - this.dst.w;

    if (nexty >= GAME_HEIGHT - this.dst.h) {
      nexty = GAME_HEIGHT - this.dst.h;
      this.vel.y = 0;
      this.isJumping  = false;
      this.isGrounded = true;
    }

    this.dst.x = nextx;
    this.dst.y = nexty;

    this.animate(dt);
  }
};