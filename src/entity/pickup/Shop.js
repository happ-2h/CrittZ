import { GRAVITY } from "../../math/constants";
import EntityHandler from "../../utils/EntityHandler";
import Pickup from "./Pickup";

export default class Shop extends Pickup {
  #state; // State of the shop
  #life;  // Lifetime of the shop

  constructor() {
    super();

    this.#state = 0;
    this.#life  = 3;

    this.src.set(0, 40);

    const player = EntityHandler.getPlayer(0);

    if (player.dst.x >= 64) this.dst.set(  8, 0);
    else                    this.dst.set(112, 0);

    this.dir.set(0, 1);
    this.vel.set(0, 30);
  }

  init() {}

  update(dt) {
    // Drop from sky
    if (this.#state === 0) {
      this.vel.y += GRAVITY * dt;

      let nexty = this.dst.y + this.vel.y * this.dir.y * dt;

      if (nexty >= 40) {
        nexty = 40;
        this.#state = 1;
      }

      this.dst.y = nexty;
    }
    // Wait for removal
    else if (this.#state === 1) {
      this.#life -= dt;

      if (this.#life <= 0) EntityHandler.remove(this);
    }
  }
};