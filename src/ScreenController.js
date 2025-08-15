import DOMInitializationUtilities from "./DOMInitializationUtilities";
import {
  player1PlayContainer,
  player2PlayContainer,
  pPlayerTurn,
  pAlert,
  DOMComputerGameInitializer,
} from "./DOMInitializer";
import { MISSED, HIT, ALL_SHIPS_SUNK } from "./GameboardClass";
import EventBus from "./EventBus";

class ScreenController {
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
      this.boardClickHandlerInitializer.bind(this)
    );
    // callback will have event listeners referencing boardDivs
    // therefore binding to 'this' is necessary
  }

  initUI() {
    pPlayerTurn.textContent = `${this.gameController.player1.name} to play`;
    player1PlayContainer.classList.toggle("current-player");
    return;
  }

  switchPlayersUI() {
    if (player1PlayContainer.classList.toggle("current-player"))
      pPlayerTurn.textContent = `${this.gameController.player1.name} to play`;
    if (player2PlayContainer.classList.toggle("current-player"))
      pPlayerTurn.textContent = `${this.gameController.player2.name} to play`;
    return;
  }

  endGame() {
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

  updateUI(clickedBlock, attackResult) {
    switch (attackResult) {
      case HIT:
        pAlert.textContent = "It's a hit!";
        clickedBlock.classList.add("hit");
        break;
      case MISSED:
        pAlert.textContent = "It's a miss!";
        clickedBlock.classList.add("miss");
        this.switchPlayersUI();
        break;
      case ALL_SHIPS_SUNK:
        clickedBlock.classList.add("hit");
        this.endGame();
        break;
    }
  }

  blockClickHandler(clickedLocation) {
    if (/board-[12]/.test(clickedLocation.target.id)) return null;

    const clickedBlock = clickedLocation.target;
    const [attackedY, attackedX] = [
      Number(clickedBlock.dataset.row),
      Number(clickedBlock.dataset.col),
    ];

    const attackResult = this.gameController.playTurn(attackedY, attackedX);
    if (attackResult === null) return null;
    this.updateUI(clickedLocation.target, attackResult);

    return attackResult;
  }

  boardClickHandlerInitializer() {
    this.initUI();
    this.player2BoardDiv.addEventListener("click", (e) =>
      this.blockClickHandler(e)
    );
    this.player1BoardDiv.addEventListener("click", (e) =>
      this.blockClickHandler(e)
    );
  }
}

class HumanGameScreenController extends ScreenController {
  constructor(gameController) {
    super(gameController);
  }
}
class ComputerGameScreenController extends ScreenController {
  constructor(gameController) {
    super(gameController);
    DOMComputerGameInitializer.randomizeShipPlacement(
      "player-2",
      this.gameController.player2.gameboard
    );
    this.COMPUTER_THINKING_TIME = 850;
  }

  switchPlayersUI() {
    if (player1PlayContainer.classList.toggle("current-player"))
      pPlayerTurn.textContent = `${this.gameController.player1.name} to play`;
    if (player2PlayContainer.classList.toggle("current-player"))
      pPlayerTurn.textContent = `${this.gameController.player2.name} is thinking...`;
    return;
  }

  #getAttackedBlock(attackedCoordinates) {
    const [y, x] = attackedCoordinates;
    const query = `#board-1 .block[data-row="${y}"][data-col="${x}"]`;
    const attackedBlock = document.querySelector(query);

    return attackedBlock;
  }

  async computerPlayTurn() {
    let attackResult = 1,
      coordinates;

    while (attackResult === HIT) {
      await new Promise((resolve) =>
        setInterval(resolve, this.COMPUTER_THINKING_TIME)
      );
      ({ attackResult, coordinates } = this.gameController.playTurn());
      this.updateUI(this.#getAttackedBlock(coordinates), attackResult);
    }
    this.gameController.switchTurns();
    return;
  }

  boardClickHandlerInitializer() {
    this.initUI();
    this.player2BoardDiv.addEventListener("click", (e) => {
      const clickHandlerReturnValue = this.blockClickHandler(e);
      if (clickHandlerReturnValue !== MISSED) return null;
      setTimeout(
        async () => await this.computerPlayTurn(),
        this.COMPUTER_THINKING_TIME
      );
    });
  }
}

export { HumanGameScreenController, ComputerGameScreenController };
