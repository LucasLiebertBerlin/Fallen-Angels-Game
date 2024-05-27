/**
 * Represents a movable object in the game.
 */
class MovableObject extends DrawableObject {
  /**
   * The speed of the movable object.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Indicates the direction of the movable object.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * The vertical speed of the movable object.
   * @type {number}
   */
  speedY = 0;

  /**
   * The acceleration of the movable object.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * The energy level of the movable object.
   * @type {number}
   */
  energy = 100;

  /**
   * The timestamp of the last hit on the movable object.
   * @type {number}
   */
  lastHit = 0;

  /**
   * The offset values for collision detection.
   * @type {Object}
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the movable object.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the movable object is above the ground.
   * @returns {boolean} True if the object is above ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 250;
    }
  }

  /**
   * Checks if the movable object is colliding with another object.
   * @param {MovableObject} mo - The other movable object to check collision with.
   * @returns {boolean} True if colliding, otherwise false.
   */
  isColliding(mo) {
    let collidingFromLeft =
      this.x + this.offset.left + (this.width - this.offset.right) >
        mo.x + mo.offset.left &&
      this.x + this.offset.left <
        mo.x + mo.offset.left + (mo.width - mo.offset.right) &&
      this.y + this.offset.top + (this.height - this.offset.bottom) >
        mo.y + mo.offset.top &&
      this.y + this.offset.top <
        mo.y + mo.offset.top + (mo.height - mo.offset.bottom);

    let collidingFromRight =
      this.x < mo.x + mo.width - mo.offset.right &&
      this.x + this.width - this.offset.right > mo.x &&
      this.y + this.height - this.offset.bottom > mo.y &&
      this.y < mo.y + mo.height - mo.offset.bottom;
    return collidingFromLeft || collidingFromRight;
  }

  /**
   * Decreases the energy of the movable object when hit.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the movable object is hurt.
   * @returns {boolean} True if hurt, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the movable object is dead.
   * @returns {boolean} True if dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays the animation for the movable object.
   * @param {string[]} images - The array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the movable object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the movable object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the movable object jump.
   */
  jump() {
    this.speedY = 30;
  }
}
