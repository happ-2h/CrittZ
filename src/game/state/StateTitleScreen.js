import Cursor from "../../gfx/ui/Cursor";
import Icon from "../../gfx/ui/Icon";
import Pressable from "../../gfx/ui/Pressable";
import KeyHandler from "../../input/KeyHandler";
import Rectangle from "../../math/shapes/Rectangle";
import Vec2D from "../../math/Vec2D";
import State from "./State";

export default class StateTitleScreen extends State {
  #selection;      // Menu item selection

  #inputTimer;
  #inputDelay;

  // UI
  #logo;           // Game logo
  #press_shop;     // Shop pressable
  #press_play;     // Play pressable
  #press_settings; // Settings pressable
  #cursor;         // Pressable cursor

  constructor() {
    super();

    this.#selection = 0;

    this.#inputTimer = 0;
    this.#inputDelay = 0.2;

    this.#logo = new Icon(
      new Rectangle(0, 88, 96, 40),
      new Rectangle(16, 0, 96, 40)
    );

    this.#press_shop = new Pressable(
      "shop",
      new Vec2D(8, 216),
      new Vec2D(24, 48),
      3
    );

    this.#press_play = new Pressable(
      "play",
      new Vec2D(0, 216),
      new Vec2D(56, 48),
      3
    );

    this.#press_settings = new Pressable(
      "Settings",
      new Vec2D(16, 216),
      new Vec2D(88, 48),
      3
    );

    this.#cursor = new Cursor(this.#press_shop.iconDst.x, 48);
  }

  onEnter() {}
  onExit()  {}

  init() {}

  update(dt) {
    this.#inputTimer += dt;

    if (this.#inputTimer >= this.#inputDelay) {
      this.#inputTimer = 0;

      if (KeyHandler.isDown("left")) {
        this.#selection = this.#selection === 0 ? 2 : this.#selection - 1;
      }
      else if (KeyHandler.isDown("right")) {
        this.#selection = this.#selection === 2 ? 0 : this.#selection + 1;
      }

      if (this.#selection === 0) {
        this.#cursor.x = this.#press_shop.iconDst.x;
      }
      else if (this.#selection === 1) {
        this.#cursor.x = this.#press_play.iconDst.x;
      }
      else if (this.#selection === 2) {
        this.#cursor.x = this.#press_settings.iconDst.x;
      }
    }

    this.#cursor.update(dt);
  }

  render() {
    this.#logo.draw();
    this.#press_shop.draw();
    this.#press_play.draw();
    this.#press_settings.draw();

    this.#cursor.draw();
  }
};