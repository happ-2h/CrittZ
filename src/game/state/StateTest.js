import Crow from "../../entity/mobile/enemy/crow/Crow";
import PlayerChicken from "../../entity/mobile/player/PlayerChicken";
import Shop from "../../entity/pickup/Shop";
import Skin from "../../gfx/ui/Skin";
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
    EntityHandler.add(new PlayerChicken);
    EntityHandler.add(new Shop);
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
    EntityHandler.updatePickups(dt);
  }

  render() {
    MapHandler.getMap("testMap").draw();

    EntityHandler.drawParticles();
    EntityHandler.drawPlayers();
    EntityHandler.drawEnemies();
    EntityHandler.drawBullets();
    EntityHandler.drawPickups();

    Skin.draw();
  }
};