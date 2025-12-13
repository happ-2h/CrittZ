import Bat           from "../../enemy/bat/Bat";
import BossBat       from "../../enemy/boss/BossBat";
import BossCat       from "../../enemy/boss/BossCat";
import BossSlime     from "../../enemy/boss/BossSlime";
import Bullet        from "../Bullet";
import Crow          from "../../enemy/crow/Crow";
import EntityHandler from "../../../../utils/EntityHandler";
import Frog          from "../../enemy/frog/Frog";
import ParticleSlime from "../../particle/ParticleSlime";
import PickupJewel   from "../../../pickup/PickupJewel";
import Slime         from "../../enemy/slime/Slime";
import Squid         from "../../enemy/squid/Squid";

import { GAME_WIDTH } from "../../../../game/constants";
import { GRAVITY }    from "../../../../math/constants";

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

    // Remove if off screen
    if (
      nextx <= 0 || nextx >= GAME_WIDTH ||
      nexty >= 48
    ) EntityHandler.remove(this);

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

          // Spawn jewels
          if (
            (e instanceof Slime || e instanceof Bat) &&
            Math.random() >= 0.3
          ) {
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 0));
          }
          else if (e instanceof Crow && Math.random() >= 0.4) {
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 0));
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 0));
          }
          else if (e instanceof Frog && Math.random() >= 0.4) {
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 0));
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 1));
          }
          else if (e instanceof Squid && Math.random() >= 0.5) {
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 0));
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 1));
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 0));
          }
          // Boss
          else if (
            e instanceof BossBat ||
            e instanceof BossCat ||
            e instanceof BossSlime
          ) {
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 0));
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 1));
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 0));
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 2));
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 2));
            EntityHandler.add(new PickupJewel(e.dst.x, e.dst.y, 1));
          }

          this.#owner.exp += e.exp;
          if (this.#owner.exp >= this.#owner.expNext) this.#owner.levelUp();

          // Stats
          if (
            e instanceof Slime ||
            e instanceof Bat   ||
            e instanceof Crow  ||
            e instanceof Frog  ||
            e instanceof Squid
          ) {
            ++EntityHandler.getPlayer(0).enemiesKilled;
          }
          else if (
            e instanceof BossBat   ||
            e instanceof BossCat   ||
            e instanceof BossSlime
          ) {
            ++EntityHandler.getPlayer(0).bossesKilled;
          }
        }
      }
    });

    this.dst.set(nextx, nexty, 4, 4);
  }
};