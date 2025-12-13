import Enemy from "../Enemy";

import { GAME_WIDTH } from "../../../../game/constants";

export default class BossSlime extends Enemy {
  #waitTimer; // Time slime waits for getting hit ("vulnerable")

  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(16, 64, 16, 16);
    this.dst.dim.set(16, 16);

    this.dir.set(-1, 0);
    this.vel.set(10, 0);

    this.exp = 10;

    this.frameDelay = 0.3;
    this.setFrames(65, 67);

    this.state = 0;

    this.invTimer = 2;
    this.invDelay = 0.5;

    this.stats.hp    = 30;
    this.stats.maxHp = 30;
    this.stats.atk   =  5;

    this.#waitTimer = 1;
  }

  init() {}

  update(dt) {
    // Come into viewport
    if (this.state === 0) {
      let nextx = this.dst.x + this.vel.x * this.dir.x * dt;

      if (nextx <= GAME_WIDTH - 24) {
        nextx = GAME_WIDTH - 24;
        this.state = 1;
        this.vel.x = 20;
      }

      this.dst.x = nextx;
    }
    // Boss introduction
    else if (this.state === 1) {
      this.invTimer -= dt;

      if (this.invTimer <= 0) {
        this.invTimer = 1;
        this.state = 2;
      }
    }
    // Walk across stage
    else if (this.state === 2) {
      let nextx = this.dst.x + this.vel.x * this.dir.x * dt;

      if (nextx <= 8) {
        nextx = 8;
        this.state = 3;
        this.invTimer = 0;
      }
      else if (nextx >= GAME_WIDTH - 24) {
        nextx = GAME_WIDTH - 24;
        this.state = 3;
        this.invTimer = 0;
      }

      this.dst.x = nextx;
    }
    // Vulnerable to attack
    else if (this.state === 3) {
      this.#waitTimer -= dt;

      if (this.isHurt) {
        this.#waitTimer = 1;
        this.isHurt = false;
        this.invTimer = 1;

        if (this.stats.hp < this.stats.maxHp * 0.45) this.vel.x *= 1.5;

        if (this.dir.x === 1)       this.setFrames(66, 66);
        else if (this.dir.x === -1) this.setFrames(67, 67);
      }

      if (this.#waitTimer <= 0) {
        this.#waitTimer = 1;
        this.state = 2;
        this.dir.x = -this.dir.x;
        this.invTimer = 1;

        if (this.dir.x === 1)       this.setFrames(64, 66);
        else if (this.dir.x === -1) this.setFrames(65, 67);
      }
    }

    this.animate(dt, true);
  }
};