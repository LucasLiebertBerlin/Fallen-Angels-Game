/**
 * Represents a throwable object in the game.
 */
class ThrowableObject extends MovableObject {
  /**
   * The array of image paths for the flame animation.
   * @type {string[]}
   */
  IMAGES_FLAME = [
    "img/attacks/flame10/PNG/00.png",
    "img/attacks/flame10/PNG/01.png",
    "img/attacks/flame10/PNG/02.png",
    "img/attacks/flame10/PNG/03.png",
    "img/attacks/flame10/PNG/04.png",
    "img/attacks/flame10/PNG/05.png",
    "img/attacks/flame10/PNG/06.png",
    "img/attacks/flame10/PNG/07.png",
    "img/attacks/flame10/PNG/08.png",
    "img/attacks/flame10/PNG/09.png",
    "img/attacks/flame10/PNG/10.png",
    "img/attacks/flame10/PNG/11.png",
    "img/attacks/flame10/PNG/12.png",
    "img/attacks/flame10/PNG/13.png",
    "img/attacks/flame10/PNG/14.png",
    "img/attacks/flame10/PNG/15.png",
    "img/attacks/flame10/PNG/16.png",
    "img/attacks/flame10/PNG/17.png",
    "img/attacks/flame10/PNG/18.png",
    "img/attacks/flame10/PNG/19.png",
    "img/attacks/flame10/PNG/25.png",
    "img/attacks/flame10/PNG/26.png",
    "img/attacks/flame10/PNG/27.png",
    "img/attacks/flame10/PNG/28.png",
    "img/attacks/flame10/PNG/29.png",
    "img/attacks/flame10/PNG/30.png",
    "img/attacks/flame10/PNG/31.png",
    "img/attacks/flame10/PNG/31.png",
    "img/attacks/flame10/PNG/33.png",
  ];

  /**
   * Constructs a new ThrowableObject.
   * @param {number} x - The x-coordinate of the throwable object.
   * @param {number} y - The y-coordinate of the throwable object.
   * @param {boolean} otherDirection - Whether the throwable object is moving in the opposite direction.
   */
  constructor(x, y, otherDirection) {
    super().loadImage("img/attacks/flame2/png/06.png");
    this.loadImages(this.IMAGES_FLAME);
    this.x = x - 26;
    this.y = y;
    this.otherDirection = otherDirection;
    this.height = 100;
    this.width = 150;
    this.throw();
    this.animate();
  }

  /**
   * Throws the throwable object either left or right based on its direction.
   */
  throw() {
    if (this.otherDirection) {
      this.throwLeft();
    } else {
      this.throwRight();
    }
  }

  /**
   * Throws the throwable object to the left.
   */
  throwLeft() {
    this.speedY = 30;
    this.applyGravity();
    setStoppableInterval(() => {
      this.x -= 10;
    }, 50);
  }

  /**
   * Throws the throwable object to the right.
   */
  throwRight() {
    this.speedY = 30;
    this.applyGravity();
    setStoppableInterval(() => {
      this.x += 15;
    }, 50);
  }

  /**
   * Animates the throwable object by continuously playing the flame animation.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_FLAME);
    }, 50);
  }
}
