/**
 * Indicates whether the audio is muted or not.
 * @type {boolean}
 */
let isMuted = false;

/**
 * Represents a canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Represents a keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Represents a numeric variable.
 * @type {number}
 */
let j = 1;

/**
 * Represents the sound played upon losing.
 * @type {HTMLAudioElement}
 */
let lose_sound = new Audio("audio/lose.mp3");
/**
 * Initializes the application.
 */

/**
 * Variable, die den Status des Tastaturzuweisungsfensters angibt.
 * @type {boolean}
 */
let keyboardAssignmentOpen = false;

function init() {
  toggleMobiledeviceAlert();
}

/**
 * Event listener for the 'keydown' event on the window.
 * Toggles corresponding keyboard flags based on the pressed keys.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") {
    keyboard.RIGHT = true;
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    keyboard.LEFT = true;
  } else if (e.key === "ArrowUp" || e.key === "w") {
    keyboard.UP = true;
  } else if (e.key === "ArrowDown" || e.key === "s") {
    keyboard.DOWN = true;
  } else if (e.key === " ") {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 70) {
    keyboard.F = true;
  }
});

/**
 * Event listener for the 'keyup' event on the window.
 * Toggles corresponding keyboard flags off when keys are released.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") {
    keyboard.RIGHT = false;
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    keyboard.LEFT = false;
  } else if (e.key === "ArrowUp" || e.key === "w") {
    keyboard.UP = false;
  } else if (e.key === "ArrowDown" || e.key === "s") {
    keyboard.DOWN = false;
  } else if (e.key === " ") {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 70) {
    keyboard.F = false;
  }
});

/**
 * Event listener that listens for changes in fullscreen mode and removes white color from SVG elements if fullscreen mode is exited.
 */
document.addEventListener('fullscreenchange', function() {
  let fullscreenButton = document.getElementById("fullscreenButton");
  let keyboardButton = document.getElementById("keyboardButtonDiv");
  let muteButtons = document.getElementById("muteButtons");
  if (!document.fullscreenElement) {
      removeWhiteSvgClasses(fullscreenButton, keyboardButton, muteButtons);
  }
});

/**
 * Starts the game by initializing necessary components and hiding unnecessary elements.
 */
function startGame() {
  showCanvas();
  initLevel1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  hideStartGraphics();
  showMuteButton();
}

/**
 * Displays the mute button by removing the 'd-none' class.
 */
function showMuteButton() {
  let muteButton = document.getElementById("muteButtons");
  muteButton.classList.remove("d-none");
}

/**
 * Restarts the game by hiding end and win graphics and calling startGame() again.
 */
function restartGame() {
  hideEndGraphics();
  hideWinGraphics();
  startGame();
}

/**
 * Ends the game.
 */
function endGame() {
  showEndGraphics();
  hideCanvas();
  stopGame();
  // hideKeyboardButtonDiv();
  if (!isMuted) {
    world.world_sound.pause();
    lose_sound.play();
  }
}

/**
 * Ends the game with a win.
 */
function winGame() {
  showWinGraphics();
  hideCanvas();
  stopGame();
  world.world_sound.pause();
}

/**
 * Displays the graphics for the game start.
 */
function showStartGraphics() {
  let startButton = document.getElementById("startButton");
  let startscreenImg = document.getElementById("startscreenImg");
  startButton.classList.remove("d-none");
  startscreenImg.classList.remove("d-none");
}

/**
 * Displays the graphics for the end of the game.
 */
function showEndGraphics() {
  let endscreenImg = document.getElementById("endscreenImg");
  endscreenImg.classList.remove("d-none");
  let restartButton = document.getElementById("restartButton");
  restartButton.classList.remove("d-none");
}

/**
 * Hides the graphics for the end of the game.
 */
function hideEndGraphics() {
  let endscreenImg = document.getElementById("endscreenImg");
  endscreenImg.classList.add("d-none");
}

/**
 * Displays the graphics for winning the game.
 */
function showWinGraphics() {
  let winscreenImg = document.getElementById("winscreenImg");
  let restartButton = document.getElementById("restartButton");
  winscreenImg.classList.remove("d-none");
  restartButton.classList.remove("d-none");
}

/**
 * Hides the graphics for winning the game.
 */
function hideWinGraphics() {
  let winscreenImg = document.getElementById("winscreenImg");
  let restartButton = document.getElementById("restartButton");
  winscreenImg.classList.add("d-none");
  restartButton.classList.add("d-none");
}

/**
 * Hides the graphics for the start of the game.
 */
function hideStartGraphics() {
  let startButton = document.getElementById("startButton");
  let startscreenImg = document.getElementById("startscreenImg");
  let startscreen = document.getElementById("startscreen");
  startButton.classList.add("d-none");
  startscreen.classList.add("d-none");
  startscreenImg.classList.add("d-none");
}

/**
 * Displays the canvas.
 */
function showCanvas() {
  let canvas = document.getElementById("canvas");
  canvas.classList.remove("d-none");
}

/**
 * Hides the canvas.
 */
function hideCanvas() {
  let canvas = document.getElementById("canvas");
  canvas.classList.add("d-none");
}

/**
 * Toggles fullscreen mode.
 */
function toggleFullscreen() {
  let fullscreenButton = document.getElementById("fullscreenButton");
  let keyboardButton = document.getElementById("keyboardButtonDiv");
  let muteButtons = document.getElementById("muteButtons");
  let isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  if (isFullscreen) {
    exitFullscreen();
    removeWhiteSvgClasses(fullscreenButton, keyboardButton, muteButtons);
  } else {
    let fullscreen = document.getElementById("fullscreen");
    enterFullscreen(fullscreen);
    addWhiteSvgClasses(fullscreenButton, keyboardButton, muteButtons);
  }
}

/**
 * Adds the "white-svg" class to the specified elements.
 * @param {...Element} elements - The elements to add the class to.
 */
function addWhiteSvgClasses(...elements) {
  elements.forEach((element) => {
    element.classList.add("white-svg");
  });
}

/**
 * Removes the "white-svg" class from the specified elements.
 * @param {...Element} elements - The elements to remove the class from.
 */
function removeWhiteSvgClasses(...elements) {
  elements.forEach((element) => {
    element.classList.remove("white-svg");
  });
}

/**
 * Enters fullscreen mode for the specified element.
 * @param {Element} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Toggles the sound on or off.
 */
function toggleSounds() {
  const soundIcon = document.getElementById("muteButtons");
  if (isMuted) {
    soundIcon.innerHTML = getSoundOnIcon();
    world.world_sound.play();
    isMuted = false;
  } else {
    soundIcon.innerHTML = getSoundOffIcon();
    world.world_sound.pause();
    isMuted = true; // world.ismuted 2*
  }
}

/**
 * Returns the SVG code for the sound on icon.
 * @returns {string} The SVG code for the sound on icon.
 */
function getSoundOnIcon() {
  return `
  <svg class="mute-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
  <path d="M37.341,37.567c0.264,0,0.526-0.104,0.724-0.31c2.852-2.987,4.487-7.332,4.487-11.922c0-4.589-1.636-8.934-4.486-11.921  c-0.381-0.399-1.016-0.414-1.414-0.033c-0.399,0.382-0.414,1.015-0.033,1.414c2.5,2.619,3.934,6.461,3.934,10.54  c0,4.08-1.434,7.922-3.935,10.541c-0.381,0.399-0.366,1.032,0.033,1.414C36.844,37.476,37.093,37.567,37.341,37.567z"/>
  <path d="M34.016,34.482c0.252,0,0.504-0.095,0.698-0.284c2.225-2.172,3.501-5.401,3.501-8.861c0-3.461-1.276-6.69-3.501-8.862  c-0.395-0.385-1.027-0.378-1.414,0.018c-0.386,0.396-0.378,1.028,0.018,1.414c1.841,1.797,2.897,4.506,2.897,7.431  s-1.057,5.633-2.897,7.43c-0.396,0.386-0.403,1.019-0.018,1.414C33.496,34.382,33.756,34.482,34.016,34.482z"/>
  <path d="M30.084,29.571c-0.424,0.354-0.479,0.985-0.126,1.409c0.198,0.236,0.482,0.358,0.769,0.358c0.226,0,0.453-0.076,0.641-0.232  c1.572-1.314,2.511-3.472,2.511-5.77c0-2.333-0.961-4.508-2.57-5.82c-0.428-0.35-1.058-0.282-1.407,0.144  c-0.349,0.428-0.284,1.058,0.144,1.407c1.148,0.936,1.834,2.532,1.834,4.27C31.878,27.05,31.207,28.633,30.084,29.571z"/>
  <path d="M24.03,12.536l-8.203,6.134h-4.275c-0.553,0-1,0.447-1,1v11.334c0,0.553,0.447,1,1,1h4.275l8.203,6.134  c0.176,0.132,0.387,0.199,0.599,0.199c0.152,0,0.307-0.035,0.448-0.105c0.338-0.17,0.552-0.516,0.552-0.895v-24  c0-0.379-0.214-0.725-0.552-0.895C24.739,12.275,24.332,12.31,24.03,12.536z M23.629,35.341l-6.87-5.138  c-0.173-0.129-0.383-0.199-0.599-0.199h-3.608V20.67h3.608c0.216,0,0.426-0.07,0.599-0.199l6.87-5.138V35.341z"/>
  </svg>
  `;
}

/**
 * Returns the SVG code for the sound off icon.
 * @returns {string} The SVG code for the sound off icon.
 */
function getSoundOffIcon() {
  return `
  <svg class="mute-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
  <path d="M35.735,24.4l4.542-4.548c0.39-0.392,0.39-1.024-0.001-1.415c-0.391-0.389-1.024-0.39-1.415,0.001l-4.545,4.552  l-4.545-4.552c-0.391-0.391-1.024-0.39-1.415-0.001c-0.391,0.391-0.391,1.023-0.001,1.415l4.542,4.548l-4.542,4.547  c-0.39,0.392-0.39,1.024,0.001,1.415c0.195,0.194,0.451,0.292,0.707,0.292s0.513-0.098,0.708-0.293l4.545-4.551l4.545,4.551  c0.195,0.195,0.452,0.293,0.708,0.293s0.512-0.098,0.707-0.292c0.391-0.391,0.391-1.023,0.001-1.415L35.735,24.4z"/>
  <path d="M22.642,38.06c0.152,0,0.306-0.035,0.448-0.105c0.338-0.17,0.552-0.516,0.552-0.895v-24c0-0.379-0.214-0.725-0.552-0.895  c-0.341-0.168-0.744-0.132-1.047,0.094l-8.2,6.134H9.569c-0.553,0-1,0.447-1,1v11.334c0,0.553,0.447,1,1,1h4.273l8.2,6.134  C22.219,37.992,22.43,38.06,22.642,38.06z M21.642,35.063l-6.867-5.137c-0.173-0.129-0.383-0.199-0.599-0.199h-3.606v-9.334h3.606  c0.216,0,0.426-0.07,0.599-0.199l6.867-5.137V35.063z"/>
  </svg>
  `;
}

/**
 * Funktion zum Umschalten des Tastaturzuweisungsfensters.
 * Wenn das Fenster derzeit geöffnet ist, wird es geschlossen; sonst wird es geöffnet.
 * @function
 * @returns {void}
 */
function toggleKeyboardAssignment() {
    if (keyboardAssignmentOpen) {
        closeKeyboardAssignment();
        keyboardAssignmentOpen = false;
    } else {
        openKeyboardAssignment();
        keyboardAssignmentOpen = true;
    }
}

/**
 * Opens the keyboard assignment dialog.
 */
function openKeyboardAssignment() {
  let keyboardAssignment = document.getElementById("keyboardAssignment");
  keyboardAssignment.classList.remove("d-none");
}

/**
 * Closes the keyboard assignment dialog.
 */
function closeKeyboardAssignment() {
  let keyboardAssignment = document.getElementById("keyboardAssignment");
  keyboardAssignment.classList.add("d-none");
}

/**
 * Checks if the device is a mobile device.
 * @returns {boolean} - True if the device is a mobile device, false otherwise.
 */
function isMobileDevice() {
  return window.innerWidth < 768; // Assumption: Devices with a width less than 768 pixels are considered mobile devices
}

/**
 * Toggles the visibility of the mobile device alert based on device orientation and width.
 */
function toggleMobiledeviceAlert() {
  let screenRotationDiv = document.getElementById("screenRotationDiv");
  let content = document.getElementById("fullscreen");
  
  function updateMobileAlertVisibility() {
    if (isMobileDevice()) {
      if (window.innerHeight > window.innerWidth) {
        showScreenRotationDivAndHideContent(screenRotationDiv, content);
      } else {
        hideScreenRotationDivAndShowContent(screenRotationDiv, content);
      }
    } else {
      hideScreenRotationDivAndShowContent(screenRotationDiv, content);
    }
  }
  
  updateMobileAlertVisibility();
  window.addEventListener("resize", updateMobileAlertVisibility);
  window.addEventListener("orientationchange", updateMobileAlertVisibility);
}

toggleMobiledeviceAlert();

/**
 * Displays the screen rotation alert and hides the content.
 * @param {HTMLElement} screenRotationDiv - The element representing the screen rotation alert.
 * @param {HTMLElement} content - The element representing the content to hide.
 */
function showScreenRotationDivAndHideContent(screenRotationDiv, content) {
  screenRotationDiv.classList.remove("d-none");
  content.classList.add("d-none");
}

/**
 * Hides the screen rotation alert and displays the content.
 * @param {HTMLElement} screenRotationDiv - The element representing the screen rotation alert.
 * @param {HTMLElement} content - The element representing the content to display.
 */
function hideScreenRotationDivAndShowContent(screenRotationDiv, content) {
  screenRotationDiv.classList.add("d-none");
  content.classList.remove("d-none");
}
