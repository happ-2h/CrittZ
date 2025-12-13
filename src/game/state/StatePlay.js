import BossBat       from "../../entity/mobile/enemy/boss/BossBat";
import BossCat       from "../../entity/mobile/enemy/boss/BossCat";
import BossSlime     from "../../entity/mobile/enemy/boss/BossSlime";
import Crow          from "../../entity/mobile/enemy/crow/Crow";
import EntityHandler from "../../utils/EntityHandler";
import Frog          from "../../entity/mobile/enemy/frog/Frog";
import KeyHandler    from "../../input/KeyHandler";
import MapHandler    from "../../utils/MapHandler";
import PlayerChicken from "../../entity/mobile/player/PlayerChicken";
import Shop          from "../../entity/pickup/Shop";
import Skin          from "../../gfx/ui/Skin";
import State         from "./State";
import StateHandler  from "../../utils/StateHandler";
import StatePause    from "./StatePause";

import { GAME_WIDTH } from "../constants";

export default class StatePlay extends State {
  #time;        // Keeps track of time, in seconds, until boss
  #wave;        // Current wave
  #state;       // State of the current wave

  #spawnDelay;  // Spawn delay based on wave
  #spawnTimer;  // Spawn timer
  #shopSpawned; // Was the shop spawned already

  #currentMap;  // Background map graphics

  // End stats
  #nKilledEnemies;
  #nKilledBosses;

  constructor() {
    super();

    this.#time  = 60; // 60 seconds
    this.#wave  =  1;
    this.#state =  0;

    this.#spawnDelay  = 2;
    this.#spawnTimer  = 0;
    this.#shopSpawned = false;

    this.#currentMap = "testMap";

    this.#nKilledEnemies = 0;
    this.#nKilledBosses  = 0;
  }

  onEnter() { EntityHandler.add(new PlayerChicken); }
  onExit() {}

  init() {}

  update(dt) {
    // Pause
    if (KeyHandler.isPressed("ActionB")) StateHandler.push(new StatePause);
    KeyHandler.update();

    switch(this.#state) {
      case 0: this.#stateEnter(dt);    break;
      case 1: this.#stateGameplay(dt); break;
      case 2: this.#stateCleanup();    break;
      case 3: this.#stateBossFight();  break;
      default: this.#state = 0;        break;
    }

    EntityHandler.updateAll(dt);

    Skin.update(dt);
  }

  /**
   * @brief On wave start
   *
   * @param {Number} dt - Delta time
   *
   * @todo show wave number or player fall from sky
   */
  #stateEnter(dt) {
    this.#state = 1;
  }

  /**
   * @brief Main gameplay
   *
   * @param {Number} dt - Delta time
   */
  #stateGameplay(dt) {
    this.#time -= dt;

    if (this.#time <= 0) {
      this.#time = 0;
      this.#state = 2;
    }

    this.#spawnTimer += dt;
    if (this.#spawnTimer >= this.#spawnDelay) {
      this.#spawnTimer = 0;

      // Slime
      for (let i = 0; i < this.#wave; ++i) EntityHandler.addSlime();

      // Bat
      if (Math.random() <= 0.5) EntityHandler.addBat();

      // Squid
      if (Math.random() <= 0.2) EntityHandler.addSquid();

      // Crow
      if (Math.random() <= 0.3) EntityHandler.add(new Crow);

      // Frog
      if (Math.random() <= 0.3) EntityHandler.add(new Frog);
    }

    // Spawn shop
    if (!this.#shopSpawned && (this.#time|0) === 30) {
      this.#shopSpawned = true;
      EntityHandler.add(new Shop);
    }

    Skin.setTime(this.#time);
  }

  /**
   * @brief Clean up entities for boss fight
   */
  #stateCleanup() {
    EntityHandler.removeEnemies();

    if (EntityHandler.particles.length === 0) {
      this.#state = 3;

      if ((this.#wave+3)%3 === 1)
        EntityHandler.add(new BossSlime(GAME_WIDTH, 32));
      else if ((this.#wave+3)%3 === 2)
        EntityHandler.add(new BossBat);
      else if ((this.#wave+3)%3 === 0)
        EntityHandler.add(new BossCat);
    }
  }

  /**
   * @brief Checks if the boss has been defeated
   */
  #stateBossFight() {
    // When boss has been defeated
    if (
      EntityHandler.enemies.length   === 0 &&
      EntityHandler.particles.length === 0
    ) {
      // Prepare next wave
      ++this.#wave;
      this.#state = 0;
      this.#time = 60;
      this.#spawnDelay -= 0.1;

      if (this.#spawnDelay < 0.1) this.#spawnDelay = 0.1;

      this.#shopSpawned = false;
    }
  }

  render() {
    MapHandler.getMap(this.#currentMap).draw();

    EntityHandler.drawAll();

    Skin.draw();
  }
};