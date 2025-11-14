import Player from "../../entity/mobile/player/Player";
import EntityHandler from "../../utils/EntityHandler";
import MapHandler from "../../utils/MapHandler";
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

    this.#spawnDelay = 3 - (3*(this.#wave/10));
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
      this.#time -= dt;
      if (this.#time <= 0) {
        this.#time = 1;
      }

      this.#spawnTimer += dt;
      if (this.#spawnTimer >= this.#spawnDelay) {
        this.#spawnTimer = 0;

        for (let i = 0; i < this.#wave; ++i) {
          EntityHandler.addSlime();
        }
      }
    }
    // TODO Boss introduction
    else if (this.#state === 2) {}
    // TODO Boss fight
    else if (this.#state === 3) {}

    EntityHandler.updatePlayers(dt);
    EntityHandler.updateEnemies(dt);
    EntityHandler.updateParticles(dt);
  }

  render() {
    MapHandler.getMap(this.#currentMap).draw();

    EntityHandler.drawParticles();
    EntityHandler.drawPlayers();
    EntityHandler.drawEnemies();
  }
};