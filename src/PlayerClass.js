export default class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
  }

  attack(enemyGameboard, attackY, attackX) {
    return enemyGameboard.receiveAttack(attackY, attackX);
  }
}

export class Computer extends Player {
  constructor() {
    super("Computer");
  }
}
