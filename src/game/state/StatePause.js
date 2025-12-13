import EntityHandler from "../../utils/EntityHandler";
import Icon          from "../../gfx/ui/Icon";
import KeyHandler    from "../../input/KeyHandler";
import Rectangle     from "../../math/shapes/Rectangle";
import State         from "./State";
import StateHandler  from "../../utils/StateHandler";
import Text          from "../../gfx/ui/Text";
import Vec2D         from "../../math/Vec2D";

import { TILE_SIZE } from "../constants";

export default class StatePause extends State {
  #selection;          // Selection of settings

  #iconMusic_original; // Original location
  #iconSFX_original;   // Original location
  #sinTimer;           // Sine wave timer

  // UI
  // - Icons
  #iconMusic; // Note    icon
  #iconSFX;   // Speaker icon
  #iconHP;    // Heart   icon
  #iconATK;   // Sword   icon
  #iconDEF;   // Shield  icon
  #iconLuck;  // Cherry  icon
  #iconSPD;   // Shoe    icon

  #iconArrLt; // Arrow left icon
  #iconArrRt; // Arrow left icon

  // - Text
  #txtMusic;  // Music volume value
  #txtSFX;    // SFX   volume value
  #txtHP;     // HP max  amount
  #txtATK;    // Attack  amount
  #txtDEF;    // Defense amount
  #txtLuck;   // Luck    amount
  #txtSPD;    // Speed   amount

  constructor() {
    super();

    this.#selection = 0;
    this.#sinTimer  = 0;

    this.#iconMusic_original = new Vec2D(16, 16);
    this.#iconSFX_original   = new Vec2D(16, 24);

    this.#iconMusic = new Icon(
      new Rectangle(0, 208, TILE_SIZE, TILE_SIZE),
      new Rectangle(16, 16, TILE_SIZE, TILE_SIZE)
    );
    this.#iconSFX = new Icon(
      new Rectangle(8, 208, TILE_SIZE, TILE_SIZE),
      new Rectangle(16, 24, TILE_SIZE, TILE_SIZE)
    );
    this.#iconHP = new Icon(
      new Rectangle(16, 208, TILE_SIZE, TILE_SIZE),
      new Rectangle(72,  16, TILE_SIZE, TILE_SIZE)
    );
    this.#iconATK = new Icon(
      new Rectangle(24, 208, TILE_SIZE, TILE_SIZE),
      new Rectangle(72,  24, TILE_SIZE, TILE_SIZE)
    );
    this.#iconDEF = new Icon(
      new Rectangle(32, 208, TILE_SIZE, TILE_SIZE),
      new Rectangle(72,  32, TILE_SIZE, TILE_SIZE)
    );
    this.#iconLuck = new Icon(
      new Rectangle(40, 208, TILE_SIZE, TILE_SIZE),
      new Rectangle(72,  40, TILE_SIZE, TILE_SIZE)
    );
    this.#iconSPD = new Icon(
      new Rectangle(48, 208, TILE_SIZE, TILE_SIZE),
      new Rectangle(72,  48, TILE_SIZE, TILE_SIZE)
    );

    this.#iconArrLt = new Icon(
      new Rectangle(56, 208, TILE_SIZE, TILE_SIZE),
      new Rectangle(24,  16, TILE_SIZE, TILE_SIZE)
    );
    this.#iconArrRt = new Icon(
      new Rectangle(64, 208, TILE_SIZE, TILE_SIZE),
      new Rectangle(48,  16, TILE_SIZE, TILE_SIZE)
    );

    this.#txtMusic = new Text("10", new Vec2D(32, 16));
    this.#txtSFX   = new Text("10", new Vec2D(32, 24));
    this.#txtHP    = new Text("00", new Vec2D(88, 16));
    this.#txtATK   = new Text("00", new Vec2D(88, 24));
    this.#txtDEF   = new Text("00", new Vec2D(88, 32));
    this.#txtLuck  = new Text("00", new Vec2D(88, 40));
    this.#txtSPD   = new Text("00", new Vec2D(88, 48));
  }

  onEnter() {
    const playerStats = EntityHandler.getPlayer(0).stats;
    const weaponStats = EntityHandler.getPlayer(0).weapon.stats;

    this.#txtHP.text   = Math.floor((playerStats.maxHp + weaponStats.hp))
      .toString()
      .padStart(3, '0');
    this.#txtATK.text  = Math.floor((playerStats.atk   + weaponStats.atk))
      .toString()
      .padStart(3, '0');
    this.#txtDEF.text  = Math.floor((playerStats.def   + weaponStats.def))
      .toString()
      .padStart(3, '0');
    this.#txtLuck.text = Math.floor((playerStats.luck  + weaponStats.luck))
      .toString()
      .padStart(3, '0');
    this.#txtSPD.text  = Math.floor((playerStats.spd   + weaponStats.spd))
      .toString()
      .padStart(3, '0');
  }

  onExit() {}

  init() {}

  update(dt) {
    this.#sinTimer += dt;

    // Navigate
    if (
      KeyHandler.isPressed("up") ||
      KeyHandler.isPressed("down")
    ) this.#selection = +!this.#selection;

    // Exit
    if (KeyHandler.isPressed("ActionB")) StateHandler.pop();

    // Animation
    if (this.#selection === 0) {
      this.#iconSFX.dst.y   = this.#iconSFX_original.y
      this.#iconMusic.dst.y = Math.sin(this.#sinTimer * 10) + 16;
      this.#iconArrLt.dst.y = 16;
      this.#iconArrRt.dst.y = 16;
    }
    else if (this.#selection === 1) {
      this.#iconMusic.dst.y = this.#iconMusic_original.y;
      this.#iconSFX.dst.y   = Math.sin(this.#sinTimer * 10) + 24;
      this.#iconArrLt.dst.y = 24;
      this.#iconArrRt.dst.y = 24;
    }

    KeyHandler.update();
  }

  render() {
    this.#iconMusic.draw();
    this.#iconSFX.draw();
    this.#iconHP.draw();
    this.#iconATK.draw();
    this.#iconDEF.draw();
    this.#iconLuck.draw();
    this.#iconSPD.draw();

    this.#iconArrLt.draw();
    this.#iconArrRt.draw();

    this.#txtMusic.draw();
    this.#txtSFX.draw();
    this.#txtHP.draw();
    this.#txtATK.draw();
    this.#txtDEF.draw();
    this.#txtLuck.draw();
    this.#txtSPD.draw();
  }
};