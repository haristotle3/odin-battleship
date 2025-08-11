export default class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard
  }
}

export class Computer extends Player {
  constructor() {
    super("Computer");
  }
}
