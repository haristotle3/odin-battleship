import { ALREADY_ATTACKED, HIT, MISSED } from "./GameboardClass";
export default class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
  }

  attack(opponentGameboard, attackY, attackX) {
    return opponentGameboard.receiveAttack(attackY, attackX);
  }
}

export class Computer extends Player {
  constructor(gameboard) {
    super("Computer", gameboard);
    this.queue = [];
    this.visited = new Set();
  }

  #pushAdjacentCoordinatesToQueue() {
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    const [prevY, prevX] = this.queue[this.queue.length - 1];
    directions.forEach((coordinate, i) => {
      const [newY, newX] = coordinate;
      const [y, x] = [prevY + newY, prevX + newX];

      if (y >= 0 && y < 10 && x >= 0 && x < 10) this.queue.push([y, x]);
    });
  }

  #getCoordinate() {
    let attackY, attackX;
    if (this.queue.length === 0) {
      attackY = Math.floor(Math.random() * 10);
      attackX = Math.floor(Math.random() * 10);
    } else {
      [attackY, attackX] = this.queue.shift();
    }
    return [attackY, attackX];
  }

  attack(opponentGameboard) {
    let [attackY, attackX] = this.#getCoordinate();
    let attackResult;
    while (
      (attackResult = opponentGameboard.receiveAttack(attackY, attackX)) ===
      ALREADY_ATTACKED
    )
      [attackY, attackX] = this.#getCoordinate();

    if (attackResult === HIT) {
      this.queue.push([attackY, attackX]);
      this.#pushAdjacentCoordinatesToQueue();
    }

    return { attackResult, coordinates: [attackY, attackX] };
  }
}
