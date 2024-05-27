/**
 * Represents a cloud in the game, inheriting from MovableObject.
 */
class Cloud extends MovableObject {
  /**
   * The y-coordinate of the cloud.
   * @type {number}
   */
  y = 20;

  /**
   * The width of the cloud.
   * @type {number}
   */
  width = 300 + Math.random() * (350 - 340);

  /**
   * The height of the cloud.
   * @type {number}
   */
  height = 100 + Math.random() * (110 - 100);

  /**
   * Constructs a new Cloud object.
   * @param {string} imagePath - The path to the image of the cloud.
   * @param {number} x - The initial x-coordinate of the cloud.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = Math.random() * 2700;

    this.animate();
  }

  /**
   * Animates the movement of the cloud.
   */
  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
