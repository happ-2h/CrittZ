import EntityHandler from "../../../utils/EntityHandler";
import Entity from "../../Entity";
import Bat from "../../mobile/enemy/bat/Bat";
import BossBat from "../../mobile/enemy/boss/BossBat";
import BossCat from "../../mobile/enemy/boss/BossCat";
import BossSlime from "../../mobile/enemy/boss/BossSlime";
import Crow from "../../mobile/enemy/crow/Crow";
import Frog from "../../mobile/enemy/frog/Frog";
import Slime from "../../mobile/enemy/slime/Slime";
import Squid from "../../mobile/enemy/squid/Squid";
import ParticleSlime from "../../mobile/particle/ParticleSlime";
import PickupJewel from "../../pickup/PickupJewel";
import Weapon from "../Weapon";

export default class Sword extends Weapon {
  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(16, 8);
    this.stats.atk = 3;
  }

  init() {}

  /**
   * @brief Updates the sword
   *
   * @param {Entity} owner - Owner of the weapon
   * @param {Number} dt    - Delta time value
   */
  update(owner, dt) {
    if (this.level === 1) {
      this.src.x = owner.dir.x === -1 ? 16 : 8;
      this.dst.set(
        owner.dst.x + owner.dst.w * owner.dir.x,
        owner.dst.y
      );
    }
    else {
      this.src.y = 176;
      this.src.x = owner.dir.x === -1 ? 16 : 0;
      this.src.dim.set(16, 8);
      this.dst.set(
        owner.dir.x === 1 ? owner.dst.x + 8 : owner.dst.x - 16,
        owner.dst.y, 16, 8
      );
    }

    EntityHandler.enemies.forEach(e => {
      if (this.dst.intersects(e.dst)) {
        if (e.invTimer > 0) return;

        let damage = owner.stats.atk + this.stats.atk - e.stats.def;
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

          owner.exp += e.exp;
          if (owner.exp >= owner.expNext) owner.levelUp();
        }
      }
    });
  }
};