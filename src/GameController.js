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


