import { GAME_WIDTH } from "../../../../game/constants";
import { GRAVITY } from "../../../../math/constants";
import EntityHandler from "../../../../utils/EntityHandler";
import ParticleSlime from "../../particle/ParticleSlime";
import Bullet from "../Bullet";

export default class Snowball extends Bullet {
  #owner; // Reference to entity who shot the snowball

  constructor(x, y, dir=1, owner) {
    super(x, y, 0, true);

    this.#owner = owner;

    this.src.set(4, 24, 4, 4);
    this.dst.set(x, y, 4, 4);

    this.vel.set(50, -80);

    this.dir.x = dir

    this.stats.atk = 3;
  }

  init() {}

  update(dt) {
    this.vel.y += GRAVITY * dt;
    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * dt;

    if (
      nextx <= 0 || nextx >= GAME_WIDTH ||
      nexty >= 48
    )
      EntityHandler.remove(this);

    EntityHandler.enemies.forEach(e => {
      if (this.dst.intersects(e.dst)) {
        if (e.invTimer > 0) return;

        let damage = this.#owner.stats.atk + this.stats.atk - e.stats.def;
        if (damage <= 0) damage = 1;

        e.stats.hp -= damage;

        e.isHurt = true;

        if (e.stats.hp <= 0) {
          EntityHandler.remove(e);

          EntityHandler.add(new ParticleSlime(e.dst.x, e.dst.y, 4.1887));
          EntityHandler.add(new ParticleSlime(e.dst.x, e.dst.y, 5.2359));
          EntityHandler.add(new ParticleSlime(e.dst.x, e.dst.y, 4.7123));

          this.#owner.exp += e.exp;
          if (this.#owner.exp >= this.#owner.expNext) this.#owner.levelUp();
        }
      }
    });

    this.dst.set(nextx, nexty, 4, 4);
  }
};