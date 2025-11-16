import BossSlime from "../../entity/mobile/enemy/boss/BossSlime";
import Player from "../../entity/mobile/player/Player";
import Skin from "../../gfx/ui/Skin";
import EntityHandler from "../../utils/EntityHandler";
import MapHandler from "../../utils/MapHandler";
import { GAME_WIDTH } from "../constants";
import State from "./State";

export default class StatePlay extends State {
  #time;       // Keeps track of time, in seconds, until boss
  #wave;       // Current wave
  #state;      // State of the current wave

  #spawnDelay; // Spawn delay based on wave
  #spawnTimer; // Spawn timer

  #currentMap; // Background map graphics

  // End stats
  #nKilledEnemies;
  #nKilledBosses;

  constructor() {
    super();

    this.#time  = 60; // 60 seconds
    this.#wave  =  1;
    this.#state =  0;

    // this.#spawnDelay = 3 - (3*(this.#wave/10));
    this.#spawnDelay = 2;
    this.#spawnTimer = 0;

    this.#currentMap = "testMap";

    this.#nKilledEnemies = 0;
    this.#nKilledBosses  = 0;
  }

  onEnter() {
    EntityHandler.add(new Player(60, 40));
  }
  onExit() {}

  init() {}

  update(dt) {
    // TODO show wave number or player fall from sky
    if (this.#state === 0) {
      this.#state = 1;
    }
    // Normal gameplay
    else if (this.#state === 1) {
      this.#time -= dt*5;
      if (this.#time <= 0) {
        this.#time = 0;
        this.#state = 2;
      }

      this.#spawnTimer += dt;
      if (this.#spawnTimer >= this.#spawnDelay) {
        this.#spawnTimer = 0;

        for (let i = 0; i < this.#wave; ++i) {
          EntityHandler.addSlime();
        }
      }

      Skin.setTime(this.#time);
    }
    // Clean up
    else if (this.#state === 2) {
      EntityHandler.removeEnemies();

      if (EntityHandler.particles.length === 0) {
        this.#state = 3;

        if (this.#wave === 1)
          EntityHandler.add(new BossSlime(GAME_WIDTH, 32));
      }
    }
    // Boss fight
    else if (this.#state === 3) {
      if (
        EntityHandler.enemies.length === 0 &&
        EntityHandler.particles.length === 0
      ) {
        ++this.#wave;
        this.#state = 0;
        this.#time = 60;
        this.#spawnDelay -= 0.1;

        if (this.#spawnDelay < 0.1) this.#spawnDelay = 0.1;
      }
    }

    EntityHandler.updatePlayers(dt);
    EntityHandler.updateEnemies(dt);
    EntityHandler.updateParticles(dt);

    Skin.update(dt);
  }

  render() {
    MapHandler.getMap(this.#currentMap).draw();

    EntityHandler.drawParticles();
    EntityHandler.drawPlayers();
    EntityHandler.drawEnemies();

    Skin.draw();
  }
};