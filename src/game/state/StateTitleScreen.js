import Character     from "../../entity/mobile/npc/Character";
import Cursor        from "../../gfx/ui/Cursor";
import EntityHandler from "../../utils/EntityHandler";
import Icon          from "../../gfx/ui/Icon";
import KeyHandler    from "../../input/KeyHandler";
import Pressable     from "../../gfx/ui/Pressable";
import Rectangle     from "../../math/shapes/Rectangle";
import Renderer      from "../../gfx/Renderer";
import State         from "./State";
import StateHandler  from "../../utils/StateHandler";
import StateMainShop from "./StateMainShop";
import StatePlay     from "./StatePlay";
import Vec2D         from "../../math/Vec2D";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";

export default class StateTitleScreen extends State {
  #selection;      // Menu item selection

  // UI
  #logo;           // Game logo
  #press_shop;     // Shop pressable
  #press_play;     // Play pressable
  #press_settings; // Settings pressable
  #cursor;         // Pressable cursor

  // Logo distortion effect
  #imgData;        // Holds image data
  #pixels;         // Holds image data pixels
  #amp;            // Amplitude of wave effect
  #freq;           // Frequency of wave effect

  constructor() {
    super();

    this.#selection = 0;

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

    // Logo distortion effect
    this.#logo.draw();
    this.#imgData = Renderer.imageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.#pixels  = new Uint8ClampedArray(this.#imgData.data);
    this.#amp  = 10;
    this.#freq =  0.05;

    this.init();
  }

  onEnter() {}
  onExit()  {}

  init() {
    EntityHandler.add(new Character([1, 3], [2, 4]));
    EntityHandler.add(new Character([64, 66], [65, 67]));
  }

  update(dt) {
    this.#freq += dt * 0.05;

    // Handle input
    if (KeyHandler.isPressed("left"))
      this.#selection = this.#selection === 0 ? 2 : this.#selection - 1;
    else if (KeyHandler.isPressed("right"))
      this.#selection = this.#selection === 2 ? 0 : this.#selection + 1;
    else if (KeyHandler.isPressed("ActionA")) {
      if (this.#selection === 0) {
        StateHandler.pop();
        StateHandler.push(new StateMainShop);
      }
      else if (this.#selection === 1) {
        StateHandler.pop();
        StateHandler.push(new StatePlay);
      }
      else if (this.#selection === 2) {}
    }

    // Move cursor based on focused item
    if (this.#selection === 0)
      this.#cursor.x = this.#press_shop.iconDst.x;
    else if (this.#selection === 1)
      this.#cursor.x = this.#press_play.iconDst.x;
    else if (this.#selection === 2)
      this.#cursor.x = this.#press_settings.iconDst.x;

    this.#cursor.update(dt);
    KeyHandler.update();

    EntityHandler.updateNPCs(dt);

    // Logo distortion effect
    for (let y = 0; y < SCREEN_HEIGHT; ++y) {
      for (let x = 0; x < SCREEN_WIDTH; ++x) {
        const idx = (x + y * SCREEN_WIDTH)<<2;

        const dx = x + Math.cos(y * this.#freq) * this.#amp;
        const sx = Math.max(0, Math.min(SCREEN_WIDTH - 1, Math.round(dx)));
        const dy = y + Math.sin(x * this.#freq/4) * this.#amp * 4;
        const sy = Math.max(0, Math.min(SCREEN_WIDTH - 1, Math.round(dy)));

        const six = (sx + sy * SCREEN_WIDTH) * 4;

        this.#pixels[idx]     = this.#imgData.data[six];
        this.#pixels[idx + 1] = this.#imgData.data[six + 1];
        this.#pixels[idx + 2] = this.#imgData.data[six + 2];
        this.#pixels[idx + 3] = this.#imgData.data[six + 3];
      }
    }
  }

  render() {
    Renderer.putImageData(
      new ImageData(this.#pixels, SCREEN_WIDTH, SCREEN_HEIGHT),
      0, 0
    );

    EntityHandler.drawNPCs();

    this.#press_shop.draw();
    this.#press_play.draw();
    this.#press_settings.draw();

    this.#cursor.draw();
  }
};