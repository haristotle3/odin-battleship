import Player, { Computer } from "./PlayerClass.js";
import Gameboard from "./GameboardClass.js";

export default class GameController {
  constructor(playerOneName, playerTwoName, versusComputer) {
    this.player1 = new Player(playerOneName, new Gameboard());
    this.player2 = versusComputer ? new Computer() : new Player(playerTwoName, new Gameboard());
    this.currentPlayer = this.player1;
  }

  initializeGame() {}
}
