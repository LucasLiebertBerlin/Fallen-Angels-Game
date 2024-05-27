/**
 * Represents the end boss in the game.
 */
class Endboss extends MovableObject {
  /**
   * The height of the end boss.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the end boss.
   * @type {number}
   */
  width = 200;

  /**
   * The y-coordinate of the end boss.
   * @type {number}
   */
  y = 195;

  /**
   * Indicates whether the end boss is hurt.
   * @type {boolean}
   */
  isHurt = false;

  /**
   * The number of live golems.
   * @type {number}
   */
  golemLive = 40;

  /**
   * Indicates if the end boss finished walking.
   * @type {boolean}
   */
  finishedWalking = false;

  /**
   * Reference to the nearby character.
   */
  nearByCharacter;

  /**
   * The sound played when the end boss is hurt.
   * @type {Audio}
   */
  golemHurt_sound = new Audio("audio/golemHurt.mp3");

  /**
   * The sound played when the end boss starts.
   * @type {Audio}
   */
  start_sound = new Audio("audio/endbossStartSound.mp3");

  /**
   * Indicates whether the start sound was played.
   * @type {boolean}
   */
  startsoundPlayed = false;

  /**
   * The sound played when a golem dies.
   * @type {Audio}
   */
  golemDied_sound = new Audio("audio/golemDied.mp3");

  /**
   * The offset values for collision detection.
   * @type {Object}
   */
  offset = {
    top: 80,
    left: 20,
    right: 20,
    bottom: 85,
  };

/**
 * Contains image paths for the end boss animations.
 */
IMAGES_WALKING = [
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_000.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_001.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_002.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_003.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_004.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_005.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_006.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_007.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_008.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_010.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_011.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_012.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_013.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_014.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_015.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_016.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Walking/Golem_02_Walking_017.png",
];

/**
 * Contains image paths for the attacking animation of the end boss.
 */
IMAGES_ATTACKING = [
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_000.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_001.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_002.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_003.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_004.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_005.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_006.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_007.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_008.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_009.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_010.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Attacking/Golem_02_Attacking_011.png",
];

/**
 * Contains image paths for the hurt animation of the end boss.
 */
IMAGES_HURT = [
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_000.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_001.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_002.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_003.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_004.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_005.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_006.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_007.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_008.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_009.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_010.png",
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Hurt/Golem_02_Hurt_011.png",
];

/**
 * Contains image paths for the dead animation of the end boss.
 */
IMAGES_DEAD = [
  "img/big_golem_boss/PNG/Golem_02/PNG Sequences/Dying/Golem_02_Dying_014.png",
];

  /**
   * Initializes the end boss.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2100;
    this.speed = 0.35;
    this.animate();
  }

  /**
   * Starts the end boss tracking and animation.
   */
  animate() {
    this.startGolemTracking();
    this.updateBossAnimation();
  }
  
  /**
   * Starts tracking the nearby character's movement.
   */
  startGolemTracking() {
    setStoppableInterval(() => {
      if (this.golemLive > 0 && this.x > 300 && this.nearByCharacter === true && !(Math.abs(world.character.x - this.x) < 1)) {
        this.trackCharacterMovement();
      }
      if (world.character.x > 1400) {
        this.checkCharacterProximity();
      }
    }, 1000 / 60);
  }

   /**
   * Tracks the movement of the nearby character.
   */
   trackCharacterMovement() {
    if (this.x > world.character.x) {
      this.moveLeft();
      this.otherDirection = false;
    } else {
      this.moveRight();
      this.otherDirection = true;
    }
  }
  
   /**
   * Checks the proximity of the character to the end boss.
   */
   checkCharacterProximity() {
    this.nearByCharacter = true;
    if (!this.startsoundPlayed && !isMuted) {
      this.playStartSound();
      this.startsoundPlayed = true;
    }
  }
  
  /**
   * Plays the start sound of the end boss.
   */
  playStartSound() {
    this.start_sound.play();
  }
  
  /**
   * Updates the animation of the end boss.
   */
  updateBossAnimation() {
    setStoppableInterval(() => {
      if (this.golemLive === 0) {
        this.handleDeadState();
      } else if (this.isHurt) {
        this.handleHurtState();
      } else if (this.finishedWalking || (Math.abs(world.character.x + world.character.width / 2 - (this.x + this.width / 2)) < 130)) {

        this.handleAttackState();
      } else if (this.nearByCharacter === true) {
        this.handleWalkingState();
      }
    }, 1000 / 10);
  }

/**
 * Handles the state when the end boss is dead.
 */
handleDeadState() {
  this.playAnimation(this.IMAGES_DEAD);
  if (!isMuted) {
    this.golemDied_sound.play();
  }
  setTimeout(() => {
    winGame();
    if (!isMuted) {
      world.win_sound.play();
    }
  }, 700);
}

/**
 * Handles the state when the end boss is hurt.
 */
handleHurtState() {
  this.playAnimation(this.IMAGES_HURT);
  if (!isMuted) {
    this.golemHurt_sound.play();
  }
}

/**
 * Handles the state when the end boss is attacking.
 */
handleAttackState() {
    this.playAnimation(this.IMAGES_ATTACKING);
}

/**
 * Handles the state when the end boss is walking.
 */
handleWalkingState() {
  this.playAnimation(this.IMAGES_WALKING);
}

/**
 * Reduces the end boss's live count when hurt.
 */
golemHurt() {
  if (this.golemLive > 0) {
    if (!isMuted) {
      this.start_sound.play();
    }
    this.golemLive = this.golemLive - 1;
    this.speed = this.speed + 0.04;
  }
  this.isHurt = true;
  setTimeout(() => {
    this.isHurt = false;
  }, 1000);
}

}
