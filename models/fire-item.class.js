/**
 * Represents a fire item in the game.
 */
class FireItem extends MovableObject {
  /**
   * The y-coordinate of the fire item.
   * @type {number}
   */
  y = 295;

  /**
   * The width of the fire item.
   * @type {number}
   */
  width = 40;

  /**
   * The height of the fire item.
   * @type {number}
   */
  height = 40;

  /**
   * Constructs a new FireItem object.
   * @param {string} imagePath - The path to the image of the fire item.
   * @param {number} x - The initial x-coordinate of the fire item.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = 100 + Math.random() * 2000;
  }
}
