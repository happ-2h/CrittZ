import Enemy from "../Enemy";

export default class Slime extends Enemy {
  #dirDelay; // Delay until next direction
  #dirTimer; // Direction delay timer

  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(0, 16);

    this.vel.set(20, 15);

    this.#dirDelay = Math.random() * 3;
    this.#dirTimer = 0;

    this.dir.set(
      (Math.random() > 0.5 ? 1 : -1),
      -1
    );

    this.exp = 2;

    this.frameDelay = 0.2;

    if      (this.dir.x ===  1) this.setFrames(64, 66);
    else if (this.dir.x === -1) this.setFrames(65, 67);
  }

  init() {}

  update(dt) {
    // Spawning
    if (this.state === 0) {
      let nexty = this.dst.y + this.vel.y * this.dir.y * dt;

      if (nexty <= 40) {
        nexty = 40;
        this.vel.y = 0;
        this.dir.y = 0;
        this.state = 1;
      }

      this.dst.y = nexty;
    }
    // Moving
    else if (this.state === 1) {
      this.#dirTimer += dt;

      if (this.#dirTimer >= this.#dirDelay) {
        this.dir.x *= -1;
        this.#dirTimer = 0;
        this.#dirDelay = Math.random() * 3;

        if      (this.dir.x ===  1) this.setFrames(64, 66);
        else if (this.dir.x === -1) this.setFrames(65, 67);
      }

      let nextx = this.dst.x + this.vel.x * this.dir.x * dt;

      if      (nextx <=   8) nextx =   8;
      else if (nextx >= 112) nextx = 112;

      this.dst.x = nextx;
    }

    this.animate(dt);
  }
};