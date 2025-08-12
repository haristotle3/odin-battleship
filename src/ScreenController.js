import GameController from "./GameController";
import DOMInitializationUtilities from "./DOMInitializationUtilities";
export default class ScreenController {
  constructor() {
    this.gameController = new GameController();
    this.player1 = this.gameController.player1;
    this.player2 = this.gameController.player2;

    this.player1BoardDiv = DOMInitializationUtilities.createBoard(
      this.player1.gameboard,
      "board-1"
    );
    this.player2BoardDiv = DOMInitializationUtilities.createBoard(
      this.player2.gameboard,
      "board-2"
    );
    this.player1HarbourDiv = DOMInitializationUtilities.dockShips(`player-1`);
    this.player2HarbourDiv = DOMInitializationUtilities.dockShips(`player-2`);
  }
}
