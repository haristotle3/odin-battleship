import { ALREADY_ATTACKED } from "./GameboardClass";
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
  }

  #getRandomCoordinate() {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);

    return [randomY, randomX];
  }

  attack(opponentGameboard) {
    let [randomY, randomX] = this.#getRandomCoordinate();
    let returnValue;
    while (
      (returnValue = opponentGameboard.receiveAttack(randomY, randomX)) ===
      ALREADY_ATTACKED
    )
      [randomY, randomX] = this.#getRandomCoordinate();

    return { attackResult: returnValue, coordinates: [randomY, randomX] };
  }
}
