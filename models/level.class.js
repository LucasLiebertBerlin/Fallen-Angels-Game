/**
 * Represents a level in the game.
 */
class Level {
  /**
   * The array of enemies in the level.
   * @type {Array}
   */
  enemies;

  /**
   * The array of clouds in the level.
   * @type {Array}
   */
  clouds;

  /**
   * The array of items in the level.
   * @type {Array}
   */
  items;

  /**
   * The array of background objects in the level.
   * @type {Array}
   */
  backgroundObjects;

  /**
   * The x-coordinate where the level ends.
   * @type {number}
   */
  level_end_x = 2200;

  /**
   * Constructs a new Level object.
   * @param {Array} enemies - The array of enemies in the level.
   * @param {Array} clouds - The array of clouds in the level.
   * @param {Array} items - The array of items in the level.
   * @param {Array} backgroundObjects - The array of background objects in the level.
   */
  constructor(enemies, clouds, items, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.items = items;
    this.backgroundObjects = backgroundObjects;
  }
}
