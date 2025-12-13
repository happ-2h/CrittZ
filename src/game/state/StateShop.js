import EntityHandler from "../../utils/EntityHandler";
import Icon          from "../../gfx/ui/Icon";
import KeyHandler    from "../../input/KeyHandler";
import Rectangle     from "../../math/shapes/Rectangle";
import Skin          from "../../gfx/ui/Skin";
import State         from "./State";
import StateHandler  from "../../utils/StateHandler";
import Text          from "../../gfx/ui/Text";
import Vec2D         from "../../math/Vec2D";

export default class StateShop extends State {
  #playerType;    // Chicken, goose, or penguin
  #selection;     // User selection
  #playerRef;     // Reference to the player

  #sinTimer;      // Sine wave timer

  // Weapon upgrades
  #icon_sword;    // Chicken
  #icon_gun;      // Goose
  #icon_snowball; // Penguin

  // Stat upgrades
  #icon_health;
  #icon_speed;

  // Exit
  #icon_exit;

  // Descriptions
  #txt_sword;
  #txt_gun;
  #txt_snowball;
  #txt_soldOut;

  #txt_health;
  #txt_speed;

  #txt_exit;

  // Money
  #txt_cost;
  #txt_player;

  constructor(player="") {
    super();

    this.#playerType = player;
    this.#selection  = 0;
    this.#sinTimer   = 0;
    this.#playerRef  = EntityHandler.getPlayer(0);

    this.#icon_sword = new Icon(
      new Rectangle(0, 176, 16, 8),
      new Rectangle(8, 8, 16, 8)
    );
    this.#icon_gun = new Icon(
      new Rectangle(0, 184, 16, 8),
      new Rectangle(8, 8, 16, 8)
    );
    this.#icon_snowball = new Icon(
      new Rectangle(0, 192, 16, 8),
      new Rectangle(8, 8, 16, 8)
    );

    this.#icon_health = new Icon(
      new Rectangle(0, 200, 8, 8),
      new Rectangle(8, 24, 8, 8)
    );
    this.#icon_speed = new Icon(
      new Rectangle(8, 200, 8, 8),
      new Rectangle(8, 40, 8, 8)
    );

    this.#icon_exit = new Icon(
      new Rectangle(24, 200, 8, 8),
      new Rectangle(8, 56, 8, 8)
    );

    this.#txt_sword    = new Text("range  +8", new Vec2D(28, 8));
    this.#txt_gun      = new Text("2 sided", new Vec2D(28, 8));
    this.#txt_snowball = new Text("extra shot", new Vec2D(28, 8));

    this.#txt_health   = new Text("health +5", new Vec2D(28, 24));
    this.#txt_speed    = new Text("speed  +1", new Vec2D(28, 40));
    this.#txt_exit     = new Text("exit", new Vec2D(28, 56));

    this.#txt_cost     = new Text("000", new Vec2D(104, 56), 0);
    this.#txt_player   = new Text(
      EntityHandler.getPlayer(0).money.toString().padStart(3, '0'),
      new Vec2D(104, 64), 0
    );

    this.#txt_soldOut  = new Text("sold out", new Vec2D(28, 8));
  }

  onEnter() {}
  onExit()  {}

  init() {}

  update(dt) {
    if (KeyHandler.isPressed("down"))
      this.#selection = this.#selection === 3 ? 0 : this.#selection + 1;
    else if (KeyHandler.isPressed("up"))
      this.#selection = this.#selection === 0 ? 3 : this.#selection - 1;
    else if (KeyHandler.isPressed("ActionA")) {
      switch(this.#selection) {
        // Weapon upgrade
        case 0:
          if (
            this.#playerRef.money >= 100 &&
            this.#playerRef.weapon.level === 1
          ) {
            this.#playerRef.weapon.level = 2;
            this.#playerRef.money -= 100;
            this.#txt_player.text = this.#playerRef.money.toString().padStart(3, '0');
          }
          break;
        // Health
        case 1:
          if (
            this.#playerRef.money >= 20 &&
            this.#playerRef.stats.hp < this.#playerRef.stats.maxHp
          ) {
            this.#playerRef.stats.hp =
              this.#playerRef.stats.hp + 5 > this.#playerRef.stats.maxHp ?
                this.#playerRef.stats.maxHp :
                this.#playerRef.stats.hp + 5;
            Skin.setHealth(this.#playerRef.stats.hp, this.#playerRef.stats.maxHp);
            this.#playerRef.money -= 20;
            this.#txt_player.text = this.#playerRef.money.toString().padStart(3, '0');
          }
          break;
        // Speed
        case 2:
          // Upgrade cap
          if (
            this.#playerRef.vel.x >= 80 &&
            this.#playerRef.weapon.fireRate <= 0.1
          ) break;

          if (this.#playerRef.money >= 50) {
            if (this.#playerRef.vel.x < 80)
              ++this.#playerRef.vel.x;
            if (this.#playerRef.weapon.fireRate > 0.1)
              this.#playerRef.weapon.fireRate -= 0.01;
            this.#playerRef.money -= 50;
            this.#txt_player.text = this.#playerRef.money.toString().padStart(3, '0');
          }
          break;
        // Exit
        default:
          StateHandler.pop();
          break;
      }
    }

    this.#sinTimer += dt;

    if (this.#selection === 0) {
      // Adjust adjacent icons
      this.#icon_exit.dst.x = 8;
      this.#icon_health.dst.y = 24;

      this.#icon_sword.dst.y    = Math.sin(this.#sinTimer * 10) + 8;
      this.#icon_sword.dst.x    = Math.cos(this.#sinTimer * 20) + 8;
      this.#icon_gun.dst.y      = Math.sin(this.#sinTimer * 10) + 8;
      this.#icon_gun.dst.x      = Math.cos(this.#sinTimer *  5) + 8;
      this.#icon_snowball.dst.y = Math.sin(this.#sinTimer *  5) + 8;
      this.#icon_snowball.dst.x = Math.cos(this.#sinTimer * 10) + 8;

      this.#txt_cost.text = "100";
    }
    else if (this.#selection === 1) {
      // Adjust adjacent icons
      this.#icon_sword.dst.x = 8;
      this.#icon_sword.dst.y = 8;
      this.#icon_gun.dst.x = 8;
      this.#icon_gun.dst.y = 8;
      this.#icon_snowball.dst.x = 8;
      this.#icon_snowball.dst.y = 8;
      this.#icon_speed.dst.y = 40;

      this.#icon_health.dst.y = Math.sin(this.#sinTimer * 10) + 24;

      this.#txt_cost.text = "020";
    }
    else if (this.#selection === 2) {
      // Adjust adjacent icons
      this.#icon_health.dst.y = 24;
      this.#icon_exit.dst.x = 8;

      this.#icon_speed.dst.y = Math.sin(this.#sinTimer * 10) + 40;

      this.#txt_cost.text = "050";
    }
    else if (this.#selection === 3) {
      // Adjust adjacent icons
      this.#icon_speed.dst.y = 40;
      this.#icon_sword.dst.x = 8;
      this.#icon_sword.dst.y = 8;

      this.#icon_exit.dst.x = Math.sin(this.#sinTimer * 10) + 8;

      this.#txt_cost.text = "";
    }

    KeyHandler.update();
  }

  render() {
    if (this.#playerRef.weapon.level > 1)
      this.#txt_soldOut.draw();
    else if (this.#playerType === "chicken") {
      this.#icon_sword.draw();
      this.#txt_sword.draw();
    }
    else if (this.#playerType === "goose") {
      this.#icon_gun.draw();
      this.#txt_gun.draw();
    }
    else if (this.#playerType === "penguin") {
      this.#icon_snowball.draw();
      this.#txt_snowball.draw();
    }

    this.#icon_health.draw();
    this.#icon_speed.draw();

    this.#icon_exit.draw();

    this.#txt_health.draw();
    this.#txt_speed.draw();
    this.#txt_exit.draw();

    this.#txt_cost.draw();
    this.#txt_player.draw();
  }
};