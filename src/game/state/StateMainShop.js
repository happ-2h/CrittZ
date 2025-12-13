import EntityHandler    from "../../utils/EntityHandler";
import Icon             from "../../gfx/ui/Icon";
import KeyHandler       from "../../input/KeyHandler";
import PlayerPreview    from "../../entity/mobile/npc/PlayerPreview";
import Rectangle        from "../../math/shapes/Rectangle";
import Renderer         from "../../gfx/Renderer";
import Skin             from "../../gfx/ui/Skin";
import State            from "./State";
import StateHandler     from "../../utils/StateHandler";
import StateTitleScreen from "./StateTitleScreen";
import Text             from "../../gfx/ui/Text";
import User             from "../user/User";
import Vec2D            from "../../math/Vec2D";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";

export default class StateMainShop extends State {
  #page;
  #totalPages;

  #playerPreview;

  // UI
  // - Icons
  #iconCurrency;
  #iconNext;
  #iconPrev;

  // -- Player stats
  #iconHealth;
  #iconAtk;
  #iconDef;
  #iconLuck;
  #iconSpeed;

  // - Text
  #txtPrice;

  // -- Player stats
  #txtHP;
  #txtAtk;
  #txtDef;
  #txtLuck;
  #txtSpeed;

  constructor() {
    super();

    this.#page = 0;
    this.#totalPages = 3;

    this.#playerPreview = new PlayerPreview;

    // UI
    // - Icons
    this.#iconCurrency = new Icon(
      new Rectangle(24, 160),
      new Rectangle(96, 0)
    );

    this.#iconPrev = new Icon(
      new Rectangle(72, 208),
      new Rectangle(0, 44)
    );

    this.#iconNext = new Icon(
      new Rectangle(80, 208),
      new Rectangle(120, 44)
    );

    // -- Player stats
    this.#iconHealth = new Icon(
      new Rectangle(16, 208),
      new Rectangle(0, 0)
    );
    this.#iconAtk = new Icon(
      new Rectangle(24, 208),
      new Rectangle(0, 8)
    );
    this.#iconDef = new Icon(
      new Rectangle(32, 208),
      new Rectangle(0, 16)
    );
    this.#iconLuck = new Icon(
      new Rectangle(40, 208),
      new Rectangle(0, 24)
    );
    this.#iconSpeed = new Icon(
      new Rectangle(48, 208),
      new Rectangle(0, 32)
    );

    // - Text
    this.#txtPrice = new Text("0", new Vec2D(104, 0));

    // -- Player stats
    this.#txtHP    = new Text("0", new Vec2D(8,  0));
    this.#txtAtk   = new Text("0", new Vec2D(8,  8));
    this.#txtDef   = new Text("0", new Vec2D(8, 16));
    this.#txtLuck  = new Text("0", new Vec2D(8, 24));
    this.#txtSpeed = new Text("0", new Vec2D(8, 32));

    this.#parsePage();
  }

  onEnter() {}
  onExit()  {
    EntityHandler.flush();
    Renderer.clear(SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  init() {}

  update(dt) {
    if (KeyHandler.isPressed("left")) {
      this.#page = this.#page - 1 < 0 ? this.#totalPages : this.#page - 1;
      this.#parsePage();
    }
    else if (KeyHandler.isPressed("right")) {
      this.#page = this.#page + 1 > this.#totalPages ? 0 : this.#page + 1;
      this.#parsePage();
    }
    else if (KeyHandler.isPressed("ActionB")) {
      StateHandler.pop();
      StateHandler.push(new StateTitleScreen);
    }

    if (this.#page >= 0 && this.#page <= 1)
      this.#playerPreview.update(dt);

    KeyHandler.update();
  }

  render() {
    // UI
    this.#iconCurrency.draw();
    this.#txtPrice.draw();

    // Pages
    // - Characters
    if (this.#page >= 0 && this.#page <= 1) {
      this.#playerPreview.draw();

      // Ground
      for (let i = 0; i < 16; ++i) {
        Renderer.image(
          "spritesheet",
          new Rectangle(0, 32),
          new Rectangle(i * 8, 48)
        );
      }

      // Stats
      this.#iconHealth.draw();
      this.#iconAtk.draw();
      this.#iconDef.draw();
      this.#iconLuck.draw();
      this.#iconSpeed.draw();

      this.#txtHP.draw();
      this.#txtAtk.draw();
      this.#txtDef.draw();
      this.#txtLuck.draw();
      this.#txtSpeed.draw();

      this.#iconPrev.draw();
      this.#iconNext.draw();
    }
    else if (this.#page >= 2 && this.#page <= 3) {
      Skin.preview(this.#page - 2, 50);
      this.#iconPrev.draw();
      this.#iconNext.draw();
    }
  }

  /**
   * @brief Parses the current page for rendering
   */
  #parsePage() {
    if (this.#page >= 0 && this.#page <= 1) {
      this.#playerPreview.currentPlayer = this.#page;

      const player = this.#playerPreview.players[this.#playerPreview.currentPlayer];

      this.#txtPrice.text =
        User.purchases&1
          ? "sold"
          : player.price;

      this.#txtHP.text    = player.stats.maxHp;
      this.#txtAtk.text   = player.stats.atk + player.weapon.stats.atk;
      this.#txtDef.text   = player.stats.def;
      this.#txtLuck.text  = player.stats.luck * 100;
      this.#txtSpeed.text = player.stats.spd;

      this.#iconPrev.dst.set(  0, 44);
      this.#iconNext.dst.set(120, 44);
    }
    else if (this.#page >= 2 && this.#page <= 3) {
      this.#iconPrev.dst.set(  0, 32);
      this.#iconNext.dst.set(120, 32);
    }
  }
};