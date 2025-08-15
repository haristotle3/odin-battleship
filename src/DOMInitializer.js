import DOMInitializationUtilities from "./DOMInitializationUtilities.js";
import EventBus from "./EventBus.js";

const pAlert = document.querySelector("p.alert");
const pPlayerTurn = document.querySelector("p.player-turn");
const playComputerButton = document.getElementById("play-computer-button");
const playHumanButton = document.getElementById("play-human-button");
const player1PlayContainer = document.querySelector(".play-container.player-1");
const player2PlayContainer = document.querySelector(".play-container.player-2");
const startButton = document.getElementById("start-button");
const passButton = document.getElementById("pass-button");

class DOMInitializer {
  constructor(gameController) {
    this.gameController = gameController;

    this.initializeNonPlayButtons(
      "player-1",
      this.gameController.player1.gameboard
    );

    pAlert.textContent = "Place ships";

    player1PlayContainer.classList.remove("hidden");

    playComputerButton.classList.add("hidden");
    playHumanButton.classList.add("hidden");
  }

  initializeNonPlayButtons(playerClass, gameboard) {
    this.#initializeRandomizeButton(playerClass, gameboard);
    this.initializeReadyButton(playerClass, gameboard);
  }

  static #getRandomDropLocation(boardID) {
    const blockArrays = document.querySelectorAll(`#${boardID} .block`);
    const randomIndex = Math.floor(Math.random() * 100);
    return blockArrays[randomIndex];
  }

  static #randomlyRotate(shipID) {
    const shipDiv = document.querySelector(`#${shipID}`);
    if (Math.random() < 0.5) shipDiv.classList.toggle("vertical");
    return 1;
  }

  #initializeRandomizeButton(playerClass, gameboard) {
    const randomizeButton = document.getElementById(`${playerClass}-randomize`);
    randomizeButton.addEventListener("click", () => {
      const harbour = gameboard.harbour;
      const shipNames = Object.keys(harbour);
      const boardID = `board-${playerClass.split("-")[1]}`;

      shipNames.forEach((shipName) => {
        const shipID = `${playerClass}-${shipName}`;
        while (
          DOMInitializer.#randomlyRotate(shipID) &&
          !DOMInitializationUtilities.placeShipDiv(
            gameboard,
            shipID,
            DOMInitializer.#getRandomDropLocation(boardID)
          )
        );
      });
    });
  }

  initializeReadyButton(playerClass, gameboard) {
    // Public method because this will be overridden in subclasses
  }

  hideAllShips() {
    const shipDivs = document.querySelectorAll(".ship");
    shipDivs.forEach((shipDiv) => shipDiv.classList.add("hidden"));
  }

  hideAllButtons() {
    const buttonsContainers = document.querySelectorAll(".buttons-container");
    buttonsContainers.forEach((buttonContainer) =>
      buttonContainer.classList.add("hidden")
    );
  }
}

class DOMComputerGameInitializer extends DOMInitializer {
  constructor(gameController) {
    super(gameController);

    startButton.addEventListener("click", () => {
      this.hideAllShips();
      this.hideAllButtons();
      player2PlayContainer.classList.remove("hidden");
      startButton.classList.add("hidden");
      EventBus.dispatchEvent(new CustomEvent("startGame"));
    });
  }

  initializeReadyButton(playerClass, gameboard) {
    const readyButton = document.getElementById(`${playerClass}-ready`);

    readyButton.addEventListener("click", () => {
      if (!gameboard.allShipsPlaced()) {
        pAlert.textContent = "Please place all the ships!";
        return;
      }

      pAlert.textContent = "Please start the game!";
      startButton.classList.remove("hidden");
    });
  }
}

class DOMHumanGameInitializer extends DOMInitializer {
  constructor(gameController) {
    super(gameController);

    this.initializeNonPlayButtons(
      "player-2",
      this.gameController.player2.gameboard
    );

    passButton.addEventListener("click", () => {
      pAlert.textContent = "Place ships";

      player2PlayContainer.classList.remove("hidden");
      player1PlayContainer.classList.add("hidden");

      passButton.classList.add("hidden");
    });

    startButton.addEventListener("click", () => {
      this.hideAllShips();
      this.hideAllButtons();
      player1PlayContainer.classList.remove("hidden");
      startButton.classList.add("hidden");
      EventBus.dispatchEvent(new CustomEvent("startGame"));
    });
  }

  initializeReadyButton(playerClass, gameboard) {
    const readyButton = document.getElementById(`${playerClass}-ready`);

    readyButton.addEventListener("click", () => {
      if (!gameboard.allShipsPlaced()) {
        pAlert.textContent = "Please place all the ships!";
        return;
      }

      if (playerClass === "player-1") {
        pAlert.textContent = "Please pass the device!";
        passButton.classList.remove("hidden");
      } else {
        pAlert.textContent = "Please start the game!";
        startButton.classList.remove("hidden");
      }
    });
  }
}

export {
  DOMComputerGameInitializer,
  DOMHumanGameInitializer,
  playComputerButton,
  playHumanButton,
  pAlert,
  pPlayerTurn,
  player1PlayContainer,
  player2PlayContainer,
};
