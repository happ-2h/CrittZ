import KeyHandler from "../../input/KeyHandler";
import Rectangle from "../../math/shapes/Rectangle";
import Vec2D from "../../math/Vec2D";
import Icon from "./Icon";
import Text from "./Text";

let instance = null;

class _Skin {
  #skinStatus; // Keeps track of purchased skins
  #loadedSkin; // ID of loaded skin

  // UI
  #topBar;
  #bottomBackground;

  #btnLeft;
  #btnRight;
  #btnPause;
  #btnAction;

  #txtLevel; // Player level number
  #txtCoins; // Player collected coins
  #txtTime;  // Remaining wave time

  constructor() {
    if (instance) throw new Error("Skin singleton reconstructed");

    this.#skinStatus = [];
    this.#loadedSkin = 0;

    this.#topBar = new Icon(
      new Rectangle(
        0, this.#loadedSkin<<5,
        128, 8
      ),
      new Rectangle(
        0, 0, 128, 8
      )
    );

    this.#bottomBackground = new Icon(
      new Rectangle(
        0, (this.#loadedSkin<<5) + 8,
        192, 32
      ),
      new Rectangle(
        0, 56, 192, 32
      )
    );

    this.#btnLeft = new Icon(
      new Rectangle(
        128, this.#loadedSkin<<5,
        16, 16
      ),
      new Rectangle(
        0, 56, 16, 16
      )
    );
    this.#btnRight = new Icon(
      new Rectangle(
        144, this.#loadedSkin<<5,
        16, 16
      ),
      new Rectangle(
        16, 56, 16, 16
      )
    );

    this.#btnPause = new Icon(
      new Rectangle(
        160, this.#loadedSkin<<5,
        16, 16
      ),
      new Rectangle(
        56, 56, 16, 16
      )
    );

    this.#btnAction = new Icon(
      new Rectangle(
        176, this.#loadedSkin<<5,
        16, 16
      ),
      new Rectangle(
        112, 56, 16, 16
      )
    );

    this.#txtLevel = new Text(
      "001",
      new Vec2D(8, 0)
    );

    this.#txtCoins = new Text(
      "000",
      new Vec2D(104, 0)
    );

    this.#txtTime = new Text(
      "60",
      new Vec2D(56, 0)
    );

    instance = this;
  }

  /**
   * @brief Sets skin status and loaded skin based on save file
   */
  loadSkins() {
    // this.#loadedSkin = 0;
    this.#skinStatus[0] = true;
    this.#skinStatus[1] = true;
  }

  /**
   * @brief Updates skin each frame
   *
   * @param {Number} dt - Delta time
   */
  update(dt) {
    this.#btnLeft.src.y =
      KeyHandler.isDown("left") ?
        (this.#loadedSkin<<5) + 16 :
        this.#loadedSkin<<5

    this.#btnRight.src.y =
      KeyHandler.isDown("right") ?
        (this.#loadedSkin<<5) + 16 :
        this.#loadedSkin<<5

    this.#btnPause.src.y =
      KeyHandler.isDown("ActionB") ?
        (this.#loadedSkin<<5) + 16 :
        this.#loadedSkin<<5

    this.#btnAction.src.y =
      KeyHandler.isDown("ActionA") ?
        (this.#loadedSkin<<5) + 16 :
        this.#loadedSkin<<5
  }

  /**
   * @brief Draws the skin
   */
  draw() {
    this.#topBar.draw("skins");
    this.#bottomBackground.draw("skins");

    this.#btnLeft.draw("skins");
    this.#btnRight.draw("skins");
    this.#btnPause.draw("skins");
    this.#btnAction.draw("skins");

    this.#txtLevel.draw();
    this.#txtCoins.draw();
    this.#txtTime.draw();
  }

  /**
   * @brief Updates the level number shown
   *
   * @param {Number} level - Level number
   */
  setLevel(level) {
    this.#txtLevel.text = level.toString().padStart(3, '0');
  }

  /**
   * @brief Updates the time number shown
   *
   * @param {Number} time - Time value
   */
  setTime(time) {
    time |= 0;
    this.#txtTime.text = time.toString().padStart(2, '0');
  }
};

const Skin = new _Skin;
export default Skin;