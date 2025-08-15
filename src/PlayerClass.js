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
  constructor() {
    super("Computer");
  }
}
