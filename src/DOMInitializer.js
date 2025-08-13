import DOMInitializationUtilities from "./DOMInitializationUtilities.js";

const pAlert = document.querySelector("p.alert");
const pPlayerTurn = document.querySelector("p.player-turn");
const playComputerButton = document.getElementById("play-computer-button");
const playHumanButton = document.getElementById("play-human-button");
const player1PlayContainer = document.querySelector(".play-container.player-1");
const player2PlayContainer = document.querySelector(".play-container.player-2");

class DOMInitializer {
  constructor(gameController) {
    this.gameController = gameController;

    this.initializeNonPlayButtons(
      "player-1",
      this.gameController.player1.gameboard
    );
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
}



export {
  DOMComputerGameInitializer,
  DOMHumanGameInitializer,
  pAlert,
  playComputerButton,
  playHumanButton,
  player1PlayContainer,
  player2PlayContainer,
};
