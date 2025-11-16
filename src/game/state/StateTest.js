import BossSlime from "../../entity/mobile/enemy/boss/BossSlime";
import Player from "../../entity/mobile/player/Player";
import EntityHandler from "../../utils/EntityHandler";
import MapHandler from "../../utils/MapHandler";
import { GAME_WIDTH } from "../constants";
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
    EntityHandler.add(new BossSlime(GAME_WIDTH, 32));
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