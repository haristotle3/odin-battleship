import DOMInitializationUtilities from "./DOMInitializationUtilities";
import {
  player1PlayContainer,
  player2PlayContainer,
  pPlayerTurn,
  pAlert,
} from "./DOMInitializer";
import { MISSED, HIT, ALL_SHIPS_SUNK } from "./GameboardClass";
import EventBus from "./EventBus";
export default class ScreenController {
  constructor(gameController) {
    this.gameController = gameController;
    const player1 = this.gameController.player1;
    const player2 = this.gameController.player2;

    this.player1BoardDiv = DOMInitializationUtilities.createBoard(
      player1.gameboard,
      "board-1"
    );
    this.player2BoardDiv = DOMInitializationUtilities.createBoard(
      player2.gameboard,
      "board-2"
    );
    this.player1HarbourDiv = DOMInitializationUtilities.dockShips("player-1");
    this.player2HarbourDiv = DOMInitializationUtilities.dockShips("player-2");

    EventBus.addEventListener(
      "startGame",
      this.#boardClickHandlerInitializer.bind(this)
    );
    // callback will have event listeners referencing boardDivs
    // therefore binding to 'this' is necessary
  }

  #initUI() {
    pPlayerTurn.textContent = `${this.gameController.player1.name} to play`;
    player1PlayContainer.classList.toggle("current-player");
    return;
  }

  #switchPlayersUI() {
    if (player1PlayContainer.classList.toggle("current-player"))
      pPlayerTurn.textContent = `${this.gameController.player1.name} to play`;
    if (player2PlayContainer.classList.toggle("current-player"))
      pPlayerTurn.textContent = `${this.gameController.player2.name} to play`;
    return;
  }

  #endGame() {
    pPlayerTurn.textContent = " ";
    pAlert.textContent = `🎉 ${this.gameController.currentPlayer.name} wins! 🎉`;

    player1PlayContainer.classList.remove("current-player");
    player2PlayContainer.classList.remove("current-player");

    const gameContainer = document.querySelector(".game-container");
    gameContainer.classList.add("end-game");
    player2PlayContainer.classList.add("end-game");
    player2PlayContainer.classList.remove("end-game");

    const shipDivs = document.querySelectorAll(".ship");
    shipDivs.forEach((shipDiv) => {
      shipDiv.classList.add("end-game");
    });
    return;
  }

  #updateUI(clickedBlock, attackResult) {
    switch (attackResult) {
      case HIT:
        pAlert.textContent = "It's a hit!";
        clickedBlock.classList.add("hit");
        break;
      case MISSED:
        pAlert.textContent = "It's a miss!";
        clickedBlock.classList.add("miss");
        this.#switchPlayersUI();
        break;
      case ALL_SHIPS_SUNK:
        clickedBlock.classList.add("hit");
        this.#endGame();
        break;
    }
  }

  #blockClickHandler(clickedLocation) {
    if (/board-[12]/.test(clickedLocation.target.id)) return;

    const clickedBlock = clickedLocation.target;
    const [attackedY, attackedX] = [
      Number(clickedBlock.dataset.row),
      Number(clickedBlock.dataset.col),
    ];

    const attackResult = this.gameController.playTurn(attackedY, attackedX);
    if (attackResult === null) return;
    this.#updateUI(clickedLocation.target, attackResult);

    return;
  }

  #boardClickHandlerInitializer() {
    this.#initUI();
    this.player2BoardDiv.addEventListener("click", (e) =>
      this.#blockClickHandler(e)
    );
    this.player1BoardDiv.addEventListener("click", (e) =>
      this.#blockClickHandler(e)
    );
  }
}
