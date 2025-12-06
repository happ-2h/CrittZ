import Renderer from "../../gfx/Renderer";
import Text from "../../gfx/ui/Text";
import KeyHandler from "../../input/KeyHandler";
import Vec2D from "../../math/Vec2D";
import EntityHandler from "../../utils/EntityHandler";
import StateHandler from "../../utils/StateHandler";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import User from "../user/User";
import State from "./State";
import StateTitleScreen from "./StateTitleScreen";

export default class StateGameOver extends State {
  #txtEnemiesKilled;
  #txtBossesKilled;
  #txtLuck;
  #txtTotal;

  constructor() {
    super();

    const player = EntityHandler.getPlayer(0);
    const total  = Math.floor(
      (player.enemiesKilled + (player.bossesKilled * 10)) * player.stats.luck
    );

    this.#txtEnemiesKilled = new Text(
      `Enemies Killed ${player.enemiesKilled}`,
      new Vec2D(4, 4),
      0
    );
    this.#txtBossesKilled = new Text(
      `Bosses  Killed ${player.bossesKilled}`,
      new Vec2D(4, 12),
      0
    );
    this.#txtLuck = new Text(
      `Luck           ${player.stats.luck * 100}%`,
      new Vec2D(4, 20),
      0
    );
    this.#txtTotal = new Text(
      `Total          ${total}`,
      new Vec2D(4, 28),
      0
    );

    User.money += total;
  }

  onEnter() {
    EntityHandler.flush(); // Clear all entities for next playthrough
    KeyHandler.update();
  }
  onExit()  {
    Renderer.clear(SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  init() {}

  update(dt) {
    if (KeyHandler.isPressed("ActionA")) {
      StateHandler.pop();
      StateHandler.push(new StateTitleScreen);
    }
  }

  render() {
    this.#txtEnemiesKilled.draw();
    this.#txtBossesKilled.draw();
    this.#txtLuck.draw();
    this.#txtTotal.draw();
  }
};