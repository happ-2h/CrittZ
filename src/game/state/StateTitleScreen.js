import Icon from "../../gfx/ui/Icon";
import Pressable from "../../gfx/ui/Pressable";
import Rectangle from "../../math/shapes/Rectangle";
import Vec2D from "../../math/Vec2D";
import State from "./State";

export default class StateTitleScreen extends State {
  // UI
  #logo;           // Game logo
  #press_shop;     // Shop pressable
  #press_play;     // Play pressable
  #press_settings; // Settings pressable

  constructor() {
    super();

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
  }

  onEnter() {}
  onExit()  {}

  init() {}

  update(dt) {}

  render() {
    this.#logo.draw();
    this.#press_shop.draw();
    this.#press_play.draw();
    this.#press_settings.draw();
  }
};