import Rectangle from "../../math/shapes/Rectangle";
import Vec2D from "../../math/Vec2D";
import Icon from "./Icon";

export default class Text {
  #text; // Raw text
  #imgs; // Sprite image text
  #pos;  // Canvas position
  #size; // Font size

  /**
   * @param {String} text - Text to output
   * @param {Vec2D}  pos  - Canvas position
   * @param {Number} size - 0 for small, 1 for normal
   */
  constructor(text="NONE", pos=null, size=1) {
    this.#text = text.toString().toLowerCase().trim();

    this.#imgs = [];
    this.#pos  = pos;
    this.#size = size;

    this.parse();
  }

  parse() {
    this.#text.split('').forEach((c, n) => {
      const charCode = c.charCodeAt(0);

      // a - z
      if (charCode >= 97 && charCode <= 122) {
        if (this.#size === 0) {
          this.#imgs.push(new Icon(
            new Rectangle(
              (charCode - 97)<<2,
              232, 4, 4
            ),
            new Rectangle(
              this.#pos.x + (n<<2),
              this.#pos.y,
              4, 4
            )
          ));
        }
        else if (this.#size === 1) {
          this.#imgs.push(new Icon(
            new Rectangle(
              (charCode - 97)<<3,
              240, 8, 8
            ),
            new Rectangle(
              this.#pos.x + (n<<3),
              this.#pos.y,
              8, 8
            )
          ));
        }
      }
      // 0 - 1
      else if (charCode >= 48 && charCode <= 57) {
        if (this.#size === 0) {
          this.#imgs.push(new Icon(
            new Rectangle(
              (charCode - 48)<<2,
              236, 4, 4
            ),
            new Rectangle(
              this.#pos.x + (n<<2),
              this.#pos.y,
              4, 4
            )
          ));
        }
        else if (this.#size === 1) {
          this.#imgs.push(new Icon(
            new Rectangle(
              (charCode - 48)<<3,
              248, 8, 8
            ),
            new Rectangle(
              this.#pos.x + (n<<3),
              this.#pos.y,
              8, 8
            )
          ));
        }
      }
    });
  }

  draw() {
    this.#imgs.forEach(i => i.draw());
  }

  // Accessors
  get text() { return this.#text; }

  // Mutators
  set text(t) {
    this.#text = t.toString().toLowerCase().trim();
    this.#imgs.length = 0;
    this.parse();
  }
};