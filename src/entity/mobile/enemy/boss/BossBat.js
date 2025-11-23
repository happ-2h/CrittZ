import { GAME_WIDTH } from "../../../../game/constants";
import { lerp } from "../../../../math/utils";
import EntityHandler from "../../../../utils/EntityHandler";
import BulletBall from "../../bullet/ball/BulletBall";
import BulletSeek from "../../bullet/seek/BulletSeek";
import Enemy from "../Enemy";

export default class BossBat extends Enemy {
  #locations;  // List of target locations
  #locationi;  // Location index

  #shootDelay; // Delay for shooting
  #shootTimer; // Timer for delay

  #firstShot;  // Did bat shoot already?

  constructor() {
    super((GAME_WIDTH>>1) - 4, 0);

    this.#locations = [
      {x:   8, y: 24},
      {x:   8, y: 40},
      {x: 112, y: 24},
      {x: 112, y: 40}
    ];

    this.#locationi = 0;

    this.#shootDelay = 1;
    this.#shootTimer = 0;

    this.#firstShot = false;

    this.frameDelay = 0.15;
    this.setFrames(296, 297);

    this.invTimer = 999;

    this.state = 0;

    this.stats.hp    = 40;
    this.stats.maxHp = 40;
  }

  init() {}

  update(dt) {
    // Come into viewport
    if (this.state === 0) {
      this.dst.y = lerp(this.dst.y, 16, 0.03);

      if (this.dst.y >= 15.9) {
        this.state = 1;
        this.dst.y = 16;

        this.#locationi = Math.random() * 4 | 0;
      }
    }
    // Go to set location
    else if (this.state === 1) {
      this.dst.set(
        lerp(this.dst.x, this.#locations[this.#locationi].x, 0.03),
        lerp(this.dst.y, this.#locations[this.#locationi].y, 0.03)
      );

      if (
        this.dst.x + 0.1 >= this.#locations[this.#locationi].x &&
        this.dst.y + 0.1 >= this.#locations[this.#locationi].y
      ) {
        this.dst.set(
          this.#locations[this.#locationi].x,
          this.#locations[this.#locationi].y
        );

        this.state = 2;

        if (this.dst.x === 8)        this.setFrames(264, 265);
        else if (this.dst.x === 112) this.setFrames(296, 297);
      }
    }
    // Attack
    else if (this.state === 2) {
      this.#shootTimer += dt;

      if (this.#shootTimer >= this.#shootDelay) {
        this.#shootTimer = 0;

        if (!this.#firstShot) {
          this.invTimer = 0;
          this.#firstShot = true;
        }

        // High
        if (this.dst.y === 24) {
          EntityHandler.add(new BulletSeek(
            this.dst.x === 8 ? 12 : 108,
            this.dst.y
          ));
        }
        // Low
        else if (this.dst.y === 40) {
          EntityHandler.add(new BulletBall(
            this.dst.x === 8 ? 12 : 108,
            this.dst.y,
            this.dst.x === 8 ? 1 : -1,
          ));
        }
      }

      if (this.isHurt) {
        this.isHurt = false;
        this.invTimer = 1;
        this.state = 0;
        this.#firstShot = false;

        if      (this.stats.hp <= 10) this.#shootDelay = 0.3;
        else if (this.stats.hp <= 20) this.#shootDelay = 0.6;
        else if (this.stats.hp <= 30) this.#shootDelay = 0.8;
      }
    }

    this.animate(dt);
  }
};