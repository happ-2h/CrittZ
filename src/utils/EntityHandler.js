import Bat           from "../entity/mobile/enemy/bat/Bat";
import Bullet        from "../entity/mobile/bullet/Bullet";
import Character     from "../entity/mobile/npc/Character";
import Enemy         from "../entity/mobile/enemy/Enemy";
import Entity        from "../entity/Entity";
import Particle      from "../entity/mobile/particle/Particle";
import ParticleSlime from "../entity/mobile/particle/ParticleSlime";
import Pickup        from "../entity/pickup/Pickup";
import Player        from "../entity/mobile/player/Player";
import Slime         from "../entity/mobile/enemy/slime/Slime";
import Squid         from "../entity/mobile/enemy/squid/Squid";

import {
  GAME_WIDTH,
  TILE_SIZE
} from "../game/constants";

let instance = null;

class _EntityHandler {
  #players;   // Player entities
  #enemies;   // Enemy entities
  #particles; // Particle entities
  #npcs;      // NPC/uncategorized entities
  #bullets;   // Bullet entities
  #pickups;   // Pickup entities

  constructor() {
    if (instance) throw new Error("EntityHandler singleton reconstructed");

    this.#players   = [];
    this.#enemies   = [];
    this.#particles = [];
    this.#npcs      = [];
    this.#bullets   = [];
    this.#pickups   = [];

    instance = this;
  }

  // Add entities
  /**
   * @brief Adds an entity to its respective list
   *
   * @param {Entity} entity - Entity to add to its respective list
   */
  add(entity) {
    if      (entity instanceof Player)    this.#players.push(entity);
    else if (entity instanceof Enemy)     this.#enemies.push(entity);
    else if (entity instanceof Particle)  this.#particles.push(entity);
    else if (entity instanceof Character) this.#npcs.push(entity);
    else if (entity instanceof Bullet)    this.#bullets.push(entity);
    else if (entity instanceof Pickup)    this.#pickups.push(entity);
  }

  /**
   * @brief Adds a slime to the enemies list
   */
  addSlime() {
    this.add(
      new Slime(
        Math.random() * 105 + TILE_SIZE,
        56
      )
    );
  }

  /**
   * @brief Adds a bat to the enemies list
   */
  addBat() {
    this.add(
      new Bat(
        Math.random() * 105 + TILE_SIZE,
        0
      )
    );
  }

  /**
   * @brief Adds a squid to the enemies list
   */
  addSquid() {
    this.add(
      new Squid(
        Math.random() >= 0.5 ? -TILE_SIZE : GAME_WIDTH,
        0
      )
    );
  }

  // Remove entities
  /**
   * @brief Removes entity from its respective list
   *
   * @param {Entity} entity - Entity to remove from its respective list
   */
  remove(entity) {
    if (entity instanceof Player)
      this.#players.splice(this.#players.indexOf(entity), 1);
    else if (entity instanceof Enemy)
      this.#enemies.splice(this.#enemies.indexOf(entity), 1);
    else if (entity instanceof Particle)
      this.#particles.splice(this.#particles.indexOf(entity), 1);
    else if (entity instanceof Bullet)
      this.#bullets.splice(this.#bullets.indexOf(entity), 1);
    else if (entity instanceof Pickup)
      this.#pickups.splice(this.#pickups.indexOf(entity), 1);
  }

  /**
   * @brief Removes all enemies from the enemy list
   */
  removeEnemies() {
    this.#enemies.forEach(e => {
      this.remove(e);

      this.add(new ParticleSlime(e.dst.x, e.dst.y, 4.1887));
      this.add(new ParticleSlime(e.dst.x, e.dst.y, 5.2359));
      this.add(new ParticleSlime(e.dst.x, e.dst.y, 4.7123));
    });
  }

  /**
   * @brief Removes all entities from all containers
   */
  flush() {
    this.#players.length   = 0;
    this.#enemies.length   = 0;
    this.#particles.length = 0;
    this.#npcs.length      = 0;
    this.#bullets.length   = 0;
    this.#pickups.length   = 0;
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

  /**
   * @brief Updates particles
   *
   * @param {Number} dt - Delta time
   */
  updateParticles(dt) {
    this.#particles.forEach(p => p.update(dt));
  }

  /**
   * @brief Updates NPCs
   *
   * @param {Number} dt - Delta time
   */
  updateNPCs(dt) {
    this.#npcs.forEach(n => n.update(dt));
  }

  /**
   * @brief Updates bullets
   *
   * @param {Number} dt - Delta time
   */
  updateBullets(dt) {
    this.#bullets.forEach(b => b.update(dt));
  }

  /**
   * @brief Updates pickups
   *
   * @param {Number} dt - Delta time
   */
  updatePickups(dt) {
    this.#pickups.forEach(p => p.update(dt));
  }

  /**
   * @brief Updates all entities except title screen NPCs
   *
   * @param {Number} dt - Delta time
   */
  updateAll(dt) {
    this.#particles.forEach(p => p.update(dt));
    this.#players.forEach(p => p.update(dt));
    this.#enemies.forEach(e => e.update(dt));
    this.#bullets.forEach(b => b.update(dt));
    this.#pickups.forEach(p => p.update(dt));
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

  /**
   * @brief Draws particles
   */
  drawParticles() {
    this.#particles.forEach(p => p.draw());
  }

  /**
   * @brief Draws NPCs
   */
  drawNPCs() {
    this.#npcs.forEach(n => n.draw());
  }

  /**
   * @brief Draws bullets
   */
  drawBullets() {
    this.#bullets.forEach(b => b.draw());
  }

  /**
   * @brief Draws pickups
   */
  drawPickups() {
    this.#pickups.forEach(p => p.draw());
  }

  /**
   * @brief Updates all entities except title screen NPCs
   */
  drawAll() {
    this.#particles.forEach(p => p.draw());
    this.#players.forEach(p => p.draw());
    this.#enemies.forEach(e => e.draw());
    this.#bullets.forEach(b => b.draw());
    this.#pickups.forEach(p => p.draw());
  }

  // Get entity
  /**
   * @brief Get the player at index n
   *
   * @param {Number} n - Index of player
   *
   * @returns Player at index n
   */
  getPlayer(n=0) {
    return this.#players[n];
  }

  /**
   * @brief Get the enemy at index n
   *
   * @param {Number} n - Index of the enemy
   *
   * @returns Enemy at index n
   */
  getEnemy(n=0) {
    return this.#enemies[n];
  }

  // Accessors
  get players()   { return this.#players; }
  get enemies()   { return this.#enemies; }
  get particles() { return this.#particles; }
  get bullets()   { return this.#bullets; }
  get pickups()   { return this.#pickups; }
};

const EntityHandler = new _EntityHandler;
export default EntityHandler;