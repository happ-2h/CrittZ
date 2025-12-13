import Rectangle from "../math/shapes/Rectangle";
import Renderer  from "../gfx/Renderer";
import Vec2D     from "../math/Vec2D";

import {
  GAME_HEIGHT_TILES,
  GAME_WIDTH_TILES,
  TILE_SIZE
} from "../game/constants";

export default class Map {
  #dim;  // Map dimensions
  #data; // Map data

  /**
   * @param {JSON} data - Map data exported from Tiled
   */
  constructor(data) {
    this.#dim  = new Vec2D(data.width, data.height);
    this.#data = [ ...data.layers[0].data ];
  }

  /**
   * @brief Draws the map
   */
  draw() {
    for (let x = 0; x < GAME_WIDTH_TILES; ++x) {
      for (let y = 0; y < GAME_HEIGHT_TILES; ++y) {
        const tileID = this.getTile(x, y);

        if (tileID > 0) {
          Renderer.image(
            "spritesheet",
            new Rectangle(
              (tileID&0x1F)<<3,
              (tileID>>5)<<3
            ),
            new Rectangle(
              x * TILE_SIZE,
              y * TILE_SIZE
            )
          );
        }
      }
    }
  }

  /**
   * @brief Get the tile ID at the given coordinates
   *
   * @param {Number} x - x-position
   * @param {Number} y - y-position
   *
   * @returns Tile id at (x, y); -1 if out of bounds
   */
  getTile(x=0, y=0) {
    x |= 0;
    y |= 0;

    if (x >= 0 && x < GAME_WIDTH_TILES && y >= 0 && y < GAME_HEIGHT_TILES)
      return this.#data[x+y*GAME_WIDTH_TILES] - 1;

    return -1;
  }

  // Accessors
  get width()  { return this.#dim.x; }
  get height() { return this.#dim.y; }
  get data()   { return this.#data;  }
};