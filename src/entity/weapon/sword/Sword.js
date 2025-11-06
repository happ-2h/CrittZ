import Entity from "../../Entity";
import Weapon from "../Weapon";

export default class Sword extends Weapon {
  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(16, 8);
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
  }
};