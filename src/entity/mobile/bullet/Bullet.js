import Vec2D from "../../../math/Vec2D";
import Entity from "../../Entity";

export default class Bullet extends Entity {
  #fromPlayer; // Was the bullet shot by the player

  /**
   * @param {Number} x           - x-position
   * @param {Number} y           - y-position
   * @param {Number} ang         - Angle of travel
   * @param {Boolean} fromPlayer - Bullet shot from player?
   */
  constructor(x=0, y=0, ang=0, fromPlayer=false) {
    super(x, y);

    this.#fromPlayer = fromPlayer;

    this.dir = Vec2D.angToVec(ang);
  }

  // Accessors
  get fromPlayer() { return this.#fromPlayer; }
};