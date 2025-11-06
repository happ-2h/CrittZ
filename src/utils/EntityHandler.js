import Enemy from "../entity/mobile/enemy/Enemy";
import Player from "../entity/mobile/player/Player";

let instance = null;

class _EntityHandler {
  #players; // Player entities
  #enemies; // Enemy entities

  constructor() {
    if (instance) throw new Error("EntityHandler singleton reconstructed");

    this.#players = [];
    this.#enemies = [];

    instance = this;
  }

  // Add entities
  /**
   * @brief Adds a player to the list
   *
   * @param {Player} player - Player entity
   */
  add(entity) {
    // if (player instanceof Player) this.#players.push(player);
    if (entity instanceof Player)     this.#players.push(entity);
    else if (entity instanceof Enemy) this.#enemies.push(entity);
  }

  // Remove entities
  /**
   * @brief Removes player from the list
   *
   * @param {Player} player - Player entity to remove
   */
  remove(entity) {
    if (entity instanceof Player)
      this.#players.splice(this.#players.indexOf(entity), 1);
  }

  // Update entities
  /**
   * @brief Updates players
   *
   * @param {Number} dt - Delta time
   */
  updatePlayers(dt) {
    this.#players.forEach(p => p.update(dt));
  }

  /**
   * @brief Updates enemies
   *
   * @param {Number} dt - Delta time
   */
  updateEnemies(dt) {
    this.#enemies.forEach(e => e.update(dt));
  }

  // Draw entities
  /**
   * @brief Draws players
   */
  drawPlayers() {
    this.#players.forEach(p => p.draw());
  }

  /**
   * @brief Draws enemies
   */
  drawEnemies() {
    this.#enemies.forEach(e => e.draw());
  }
};

const EntityHandler = new _EntityHandler;
export default EntityHandler;