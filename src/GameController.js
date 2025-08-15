import Player, { Computer } from "./PlayerClass.js";
import Gameboard, {
  ALL_SHIPS_SUNK,
  ALREADY_ATTACKED,
  HIT,
  MISSED,
} from "./GameboardClass.js";

class GameController {
  constructor(playerOneName) {
    this.player1 = new Player(playerOneName, new Gameboard());
    this.currentPlayer = this.player1;
  }

  switchTurns() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
    this.currentOpponent =
      this.currentOpponent === this.player2 ? this.player1 : this.player2;
    return;
  }

  playTurn(attackY, attackX) {
    const attackResult = this.currentPlayer.attack(
      this.currentOpponent.gameboard,
      attackY,
      attackX
    );

    switch (attackResult) {
      case ALREADY_ATTACKED:
        return null;
      case ALL_SHIPS_SUNK:
      case HIT:
        return attackResult;
      case MISSED:
        this.switchTurns();
        return MISSED;
    }
  }
}

class HumanGameController extends GameController {
  constructor(playerOneName, playerTwoName) {
    super(playerOneName);
    this.player2 = new Player(playerTwoName, new Gameboard());
    this.currentOpponent = this.player2;
  }
}

class ComputerGameController extends GameController {
  constructor(playerOneName) {
    super(playerOneName);
    this.player2 = new Computer(new Gameboard());
    this.currentOpponent = this.player2;
  }

  playTurn(attackY, attackX) {
    if (this.currentPlayer === this.player1)
      return super.playTurn(attackY, attackX);

    let attackResult = ALREADY_ATTACKED,
      coordinates;

    while (attackResult === ALREADY_ATTACKED) {
      ({ attackResult, coordinates } = this.player2.attack(
        this.currentOpponent.gameboard
      ));
    }

    return { attackResult, coordinates };
  }
}

export { HumanGameController, ComputerGameController };
