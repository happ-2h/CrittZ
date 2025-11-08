import { TILE_SIZE } from "../../game/constants";
import Rectangle from "../../math/shapes/Rectangle";
import Vec2D from "../../math/Vec2D";
import Icon from "./Icon";
import Text from "./Text";

export default class Pressable {
  #icon;  // Icon graphics
  #label; // Text label
  #pos;   // Position of the component
  #cb;    // Callback function

  /**
   * @param {String} label     - Text label
   * @param {Vec2D}  iconSrc   - Image blit source for the icon
   * @param {Vec2D}  pos       - Position on the canvas
   * @param {Number} placement - label-icon placement\
   *                             0 = horizontal label-icon\
   *                             1 = vertical label/icon\
   *                             2 = horizontal icon-label\
   *                             3 = vertical icon/label
   * @param {Function} callback - Function to call when pressed
   */
  constructor(label="NONE", iconSrc=null, pos=null, placement=0, callback=null) {
    this.#pos = pos;
    this.#cb  = callback;

    switch(placement) {
      // label-icon
      case 0:
        this.#icon  = new Icon(
          new Rectangle(
            iconSrc.x, iconSrc.y,
            TILE_SIZE, TILE_SIZE
          ),
          new Rectangle(
            this.#pos.x + (label.length<<2) + 1,
            this.#pos.y,
            TILE_SIZE, TILE_SIZE
          )
        );
        this.#label = new Text(
          label,
          new Vec2D(
            this.#pos.x,
            this.#pos.y + 2
          ),
          0
        );
        break;
      // label/icon
      case 1:
        this.#icon  = new Icon(
          new Rectangle(
            iconSrc.x, iconSrc.y,
            TILE_SIZE, TILE_SIZE
          ),
          new Rectangle(
            this.#pos.x + (label.length<<1) - 4,
            this.#pos.y + 5,
            TILE_SIZE, TILE_SIZE
          )
        );
        this.#label = new Text(
          label,
          new Vec2D(
            this.#pos.x,
            this.#pos.y
          ),
          0
        );
        break;
      // icon-label
      case 2:
        this.#icon  = new Icon(
          new Rectangle(
            iconSrc.x, iconSrc.y,
            TILE_SIZE, TILE_SIZE
          ),
          new Rectangle(
            this.#pos.x,
            this.#pos.y,
            TILE_SIZE, TILE_SIZE
          )
        );
        this.#label = new Text(
          label,
          new Vec2D(
            this.#pos.x + 9,
            this.#pos.y + 2
          ),
          0
        );
        break;
      // icon/label
      case 3:
        let center = 0;
        if (label.length > 2) {
          center = (label.length<<1) - 4;
        }
        this.#icon  = new Icon(
          new Rectangle(
            iconSrc.x, iconSrc.y,
            TILE_SIZE, TILE_SIZE
          ),
          new Rectangle(
            this.#pos.x + center,
            this.#pos.y,
            TILE_SIZE, TILE_SIZE
          )
        );
        this.#label = new Text(
          label,
          new Vec2D(
            this.#pos.x,
            this.#pos.y + 10
          ),
          0
        );
        break;
    }
  }

  /**
   * @brief Draws the pressable
   */
  draw() {
    this.#icon?.draw();
    this.#label?.draw();
  }

  /**
   * @brief Calls the callback function
   */
  press() {
    this.#cb();
  }
};