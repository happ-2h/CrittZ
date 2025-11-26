import EntityHandler from "../../../utils/EntityHandler";
import BulletGun from "../../mobile/bullet/gun/BulletGun";
import Weapon from "../Weapon";

export default class Gun extends Weapon {
  #fireRate;  // Rate of fire
  #fireTimer; // Timer for firing

  constructor(x=0, y=0) {
    super(x, y);

    this.#fireRate  = 0.6;
    this.#fireTimer = 0;

    this.stats.atk = 8;
  }

  init() {}

  update(owner, dt) {
    this.#fireTimer += dt;

    if (this.#fireTimer >= this.#fireRate) {
      this.#fireTimer = 0;

      EntityHandler.add(
        new BulletGun(
          owner.dir.x === 1 ? owner.dst.x+4 : owner.dst.x,
          owner.dst.y + 2,
          owner.dir.x,
          owner
        )
      );
    }
  }

  // Mutators
  set fireRate(f)  { this.#fireRate = f; }
  set fireTimer(f) { this.#fireTimer = f; }

  // Accessors
  get fireRate()  { return this.#fireRate; }
  get fireTimer() { return this.#fireTimer; }
};