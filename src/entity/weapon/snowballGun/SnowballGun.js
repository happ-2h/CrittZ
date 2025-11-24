import EntityHandler from "../../../utils/EntityHandler";
import Snowball from "../../mobile/bullet/snowball/Snowball";
import Weapon from "../Weapon";

export default class SnowballGun extends Weapon {
  #fireRate;  // Rate of fire
  #fireTimer; // Timer for firing

  constructor(x=0, y=0) {
    super(x, y);

    this.stats.atk = 5;

    this.#fireRate = 0.6;
    this.#fireTimer = 0;
  }

  init() {}

  update(owner, dt) {
    this.#fireTimer += dt;

    if (this.#fireTimer >= this.#fireRate) {
      this.#fireTimer = 0;

      EntityHandler.add(new Snowball(owner.dst.x, owner.dst.y, owner.dir.x, owner));
    }
  }

  // Mutators
  set fireRate(f)  { this.#fireRate = f; }
  set fireTimer(f) { this.#fireTimer = f; }

  // Accessors
  get fireRate()  { return this.#fireRate; }
  get fireTimer() { return this.#fireTimer; }
};