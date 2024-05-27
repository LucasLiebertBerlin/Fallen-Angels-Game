/**
 * Represents a character in the game, extending the MovableObject class.
 */
class Character extends MovableObject {
  /**
   * Speed of the character.
   * @type {number}
   */
  speed = 10;

  /**
   * Sound played when the character is hurt.
   * @type {Audio}
   */
  hurt_sound = new Audio("audio/hurt.mp3");

  /**
   * Reference to the world the character belongs to.
   */
  world;

  /**
   * Sound played when the character is walking.
   * @type {Audio}
   */
  walking_sound = new Audio("audio/walking_grass3.wav");

  /**
   * Offset values for collision detection.
   */
  offset = {
    /**
     * Offset from the top.
     * @type {number}
     */
    top: 80,

    /**
     * Offset from the left.
     * @type {number}
     */
    left: 50,

    /**
     * Offset from the right.
     * @type {number}
     */
    right: 50,

    /**
     * Offset from the bottom.
     * @type {number}
     */
    bottom: 85,
  };

/**
 * Array of image paths representing the character's walking animation frames.
 * @type {string[]}
 */
IMAGES_WALKING = [
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_000.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_001.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_002.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_003.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_004.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_005.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_006.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_007.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_008.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_009.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_010.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_011.png",
];

/**
 * Array of image paths representing the character's jumping animation frames.
 * @type {string[]}
 */
IMAGES_JUMPING = [
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Start/0_Fallen_Angels_Jump Start_000.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Start/0_Fallen_Angels_Jump Start_001.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Start/0_Fallen_Angels_Jump Start_002.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Start/0_Fallen_Angels_Jump Start_003.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Start/0_Fallen_Angels_Jump Start_004.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Start/0_Fallen_Angels_Jump Start_005.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Loop/0_Fallen_Angels_Jump Loop_000.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Loop/0_Fallen_Angels_Jump Loop_001.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Loop/0_Fallen_Angels_Jump Loop_002.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Loop/0_Fallen_Angels_Jump Loop_003.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Loop/0_Fallen_Angels_Jump Loop_004.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Jump Loop/0_Fallen_Angels_Jump Loop_005.png",
];

/**
 * Array of image paths representing the character's dead animation frames.
 * @type {string[]}
 */
IMAGES_DEAD = [
  "img/Fallen_Angels_1/PNG/PNG Sequences/Dying/0_Fallen_Angels_Dying_014.png",
];

/**
 * Array of image paths representing the character's hurt animation frames.
 * @type {string[]}
 */
IMAGES_HURT = [
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_000.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_001.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_002.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_003.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_004.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_005.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_006.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_007.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_008.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_009.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_010.png",
  "img/Fallen_Angels_1/PNG/PNG Sequences/Hurt/0_Fallen_Angels_Hurt_011.png",
];

/**
 * Constructor function for initializing a Character object.
 */
constructor() {
  super().loadImage("img/Fallen_Angels_1/PNG/PNG Sequences/Running/0_Fallen_Angels_Running_000.png");
  this.loadImages(this.IMAGES_WALKING);
  this.loadImages(this.IMAGES_JUMPING);
  this.loadImages(this.IMAGES_DEAD);
  this.loadImages(this.IMAGES_HURT);
  this.applyGravity();
  this.animate();
}

/**
 * Initiates the animation of the character.
 */
animate() {
  this.startPlayerMovementInterval();
  this.checkPlayerStatusAndAnimate();
}

/**
 * Starts an interval for handling player movement.
 */
startPlayerMovementInterval() {
  setStoppableInterval(() => {
    this.walking_sound.pause();
    this.movePlayerRightIfKeyPressed();
    this.movePlayerLeftIfKeyPressed();
    this.jumpIfSpaceKeyPressedAndNotAboveGround();
    this.setCameraXRelativeToPlayerPosition();
  }, 1000 / 20);
}

/**
 * Checks the player's status and animates accordingly.
 */
checkPlayerStatusAndAnimate() {
  setStoppableInterval(() => {
    if (this.isDead()) {
      this.animatePlayerDeathAndEndGameAfterDelay();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      if (!isMuted) {
        this.hurt_sound.play();
      }
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }, 50);
}

/**
 * Moves the player to the right if the right arrow key is pressed.
 */
movePlayerRightIfKeyPressed() {
  if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.energy > 0) {
    this.moveRight();
    this.otherDirection = false;
    if (!isMuted) {
      this.walking_sound.play();
    }
  }
}

/**
 * Moves the player to the left if the left arrow key is pressed.
 */
movePlayerLeftIfKeyPressed() {
  if (this.world.keyboard.LEFT && this.x > 0 && this.energy > 0) {
    this.moveLeft();
    this.otherDirection = true;
    if (!isMuted) {
      this.walking_sound.play();
    }
  }
}

/**
 * Makes the player jump if the space key is pressed and the player is not above ground.
 */
jumpIfSpaceKeyPressedAndNotAboveGround() {
  if (this.world.keyboard.SPACE && !this.isAboveGround() && this.energy > 0) {
    this.jump();
  }
}

/**
 * Sets the camera's x-coordinate relative to the player's position.
 */
setCameraXRelativeToPlayerPosition() {
  this.world.camera_x = -this.x + 100;
}

/**
 * Animates the player's death and ends the game after a delay.
 */
animatePlayerDeathAndEndGameAfterDelay() {
  this.playAnimation(this.IMAGES_DEAD);
  setTimeout(() => {
    endGame();
  }, 500);
}

/**
 * Makes the player jump.
 */
jump() {
  this.speedY = 30;
}

}
