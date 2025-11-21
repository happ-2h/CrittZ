import Crow from "../../entity/mobile/enemy/crow/Crow";
import Frog from "../../entity/mobile/enemy/frog/Frog";
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
    EntityHandler.add(new Frog);
  }
  onExit()  {}

  init() {}

  update(dt) {
    // this.#slimeSpawnTimer += dt;

    if (this.#slimeSpawnTimer >= this.#slimeSpawnDelay) {
      this.#slimeSpawnTimer = 0;
      EntityHandler.add(new Crow);
    }

    EntityHandler.updatePlayers(dt);
    EntityHandler.updateEnemies(dt);
    EntityHandler.updateParticles(dt);
    EntityHandler.updateBullets(dt);
  }

  render() {
    MapHandler.getMap("testMap").draw();

    EntityHandler.drawParticles();
    EntityHandler.drawPlayers();
    EntityHandler.drawEnemies();
    EntityHandler.drawBullets();
  }
};