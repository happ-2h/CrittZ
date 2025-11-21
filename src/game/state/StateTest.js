import Squid from "../../entity/mobile/enemy/squid/Squid";
import Player from "../../entity/mobile/player/Player";
import EntityHandler from "../../utils/EntityHandler";
import MapHandler from "../../utils/MapHandler";
import State from "./State";

export default class StateTest extends State {
  #slimeSpawnDelay; // Spawn time  for slime
  #slimeSpawnTimer; // Spawn timer for slime

  constructor() {
    super();

    this.#slimeSpawnDelay = 0.3;
    this.#slimeSpawnTimer = 0;
  }

  onEnter() {
    EntityHandler.add(new Player(60, 40));
    EntityHandler.add(new Squid(10, 10));
  }
  onExit()  {}

  init() {}

  update(dt) {
    // this.#slimeSpawnTimer += dt;

    if (this.#slimeSpawnTimer >= this.#slimeSpawnDelay) {
      this.#slimeSpawnTimer = 0;
      EntityHandler.addSlime();
    }

    EntityHandler.updatePlayers(dt);
    EntityHandler.updateEnemies(dt);
    EntityHandler.updateParticles(dt);
  }

  render() {
    MapHandler.getMap("testMap").draw();

    EntityHandler.drawParticles();
    EntityHandler.drawPlayers();
    EntityHandler.drawEnemies();
  }
};