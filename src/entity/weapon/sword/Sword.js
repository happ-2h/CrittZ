import EntityHandler from "../../../utils/EntityHandler";
import Entity from "../../Entity";
import ParticleSlime from "../../mobile/particle/ParticleSlime";
import Weapon from "../Weapon";

export default class Sword extends Weapon {
  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(16, 8);
    this.stats.atk = 1;
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
    }
    this.dst.set(
      owner.dst.x + owner.dst.w * owner.dir.x,
      owner.dst.y
    );

    EntityHandler.enemies.forEach(e => {
      if (this.dst.intersects(e.dst)) {
        let damage = owner.stats.atk + this.stats.atk - e.stats.def;
        if (damage <= 0) damage = 1;

        e.stats.hp -= damage;

        if (e.stats.hp <= 0) {
          EntityHandler.remove(e);

          EntityHandler.add(new ParticleSlime(e.dst.x, e.dst.y, 4.1887));
          EntityHandler.add(new ParticleSlime(e.dst.x, e.dst.y, 5.2359));
          EntityHandler.add(new ParticleSlime(e.dst.x, e.dst.y, 4.7123));

          owner.exp += e.exp;
          if (owner.exp >= owner.expNext) owner.levelUp();
        }
      }
    });
  }
};