import Icon       from "./Icon";
import KeyHandler from "../../input/KeyHandler";
import Rectangle  from "../../math/shapes/Rectangle";
import Text       from "./Text";
import Vec2D      from "../../math/Vec2D";

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

  #txtLevel;   // Player level number
  #txtCoins;   // Player collected coins
  #txtTime;    // Remaining wave time

  #healthBar;  // Health bar graphics
  #healthFill; // Health bar filling

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

    this.#healthBar = new Icon(
      new Rectangle(
        0, 24, 32, 8
      ),
      new Rectangle(
        96, 8, 32, 8
      )
    );

    this.#healthFill = new Icon(
      new Rectangle(
        32, 24, 8, 8
      ),
      new Rectangle(
        104, 8, 24, 8
      )
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

    this.#healthFill.draw("skins");
    this.#healthBar.draw("skins");
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

  /**
   * @brief Updates the health bar shown
   *
   * @param {Number} hp    - Current HP
   * @param {Number} maxHp - Maximum HP
   */
  setHealth(hp, maxHp) {
    const percentage = hp / maxHp;

    this.#healthFill.dst.w = 24 * percentage;

    if (this.#healthFill.dst.w <= 0) this.#healthFill.dst.w = 0;
  }

  /**
   * @brief Updates the money amount text
   *
   * @param {Number} money - Money amount
   */
  setMoney(money) {
    money |= 0;
    if (money > 999) money = 999;
    this.#txtCoins.text = money.toString().padStart(3, '0');
  }

  /**
   * @brief Previews a skin
   *
   * @param {Number} n     - Skin number
   * @param {Number} price - Price of skin
   */
  preview(n=0, price=50) {
    // Top bar
    new Icon(
      new Rectangle(
        0, n<<5,
        128, 8
      ),
      new Rectangle(
        0, 0, 128, 8
      )
    ).draw("skins");

    // Bottom background
    new Icon(
      new Rectangle(
        0, (n<<5) + 8,
        192, 32
      ),
      new Rectangle(
        0, 56, 192, 32
      )
    ).draw("skins");

    // Button left
    new Icon(
      new Rectangle(
        128, n<<5,
        16, 16
      ),
      new Rectangle(
        0, 56, 16, 16
      )
    ).draw("skins");

    // Button right
    new Icon(
      new Rectangle(
        144, n<<5,
        16, 16
      ),
      new Rectangle(
        16, 56, 16, 16
      )
    ).draw("skins");

    // Button pause
    new Icon(
      new Rectangle(
        160, n<<5,
        16, 16
      ),
      new Rectangle(
        56, 56, 16, 16
      )
    ).draw("skins");

    // Button action
    new Icon(
      new Rectangle(
        176, n<<5,
        16, 16
      ),
      new Rectangle(
        112, 56, 16, 16
      )
    ).draw("skins");

    // Text level
    new Text(
      "001",
      new Vec2D(8, 0)
    ).draw("skins");

    // Text price
    new Text(
      `0${price}`,
      new Vec2D(104, 0)
    ).draw("skins");

    // Text time
    new Text(
      "60",
      new Vec2D(56, 0)
    ).draw("skins");

    // Health bar
    new Icon(
      new Rectangle(
        0, 24, 32, 8
      ),
      new Rectangle(
        96, 8, 32, 8
      )
    ).draw("skins");

    // Health fill
    new Icon(
      new Rectangle(
        32, 24, 8, 8
      ),
      new Rectangle(
        104, 8, 24, 8
      )
    ).draw("skins");
  }
};

const Skin = new _Skin;
export default Skin;