import { GAME_WIDTH } from "../../../../game/constants";
import EntityHandler from "../../../../utils/EntityHandler";
import BulletBall from "../../bullet/ball/BulletBall";
import Enemy from "../Enemy";

export default class Frog extends Enemy {
  #shootDelay; // Delay until frog shoots
  #shootTimer; // Timer for shooting

  constructor() {
    super();

    this.#shootDelay = Math.random() * (1 - 0.8) + 0.8;
    this.#shootTimer = 0;

    this.state = 0; // Coming into stage

    this.vel.set(20, 0);

    // Place right; face left
    if (Math.random() >= 0.5) {
      this.dir.x = -1;
      this.dst.set(GAME_WIDTH, 40);
      this.src.set(136, 16);
      this.setFrames(81, 83);
    }
    else {
      this.dir.x = 1;
      this.dst.set(-8, 40);
      this.src.set(128, 16);
      this.setFrames(80, 82);
    }

    this.frameDelay = 0.2;
  }

  init() {

  }

  update(dt) {
    // Coming into stage
    if (this.state === 0) {
      let nextx = this.dst.x + this.vel.x * this.dir.x * dt;

      // If destination reached, stop and go to next state
      if (this.dir.x === -1 && nextx <= GAME_WIDTH - 16) {
        nextx = GAME_WIDTH - 16;
        this.state = 1;
      }
      else if (this.dir.x === 1 && nextx >= 8) {
        nextx = 8;
        this.state = 1;
      }

      this.dst.x = nextx;
    }
    // Shoot
    else if (this.state === 1) {
      this.#shootTimer += dt;

      if (this.#shootTimer >= this.#shootDelay) {
        this.#shootTimer = 0;

        if (this.dir.x === -1) {
          EntityHandler.add(new BulletBall(
            this.dst.x - 4,
            this.dst.y + 2,
            this.dir.x
          ));
        }
        else if (this.dir.x === 1) {
          EntityHandler.add(new BulletBall(
            this.dst.x + 8,
            this.dst.y + 2,
            this.dir.x
          ));
        }
      }
    }

    this.animate(dt);
  }
};