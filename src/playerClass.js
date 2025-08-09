import { Harbour } from "./shipClass.js";
import Gameboard from "./gameboardClass.js";
export default class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.ships = new Harbour();
  }
}

export class Computer extends Player {
  constructor() {
    super("Computer");
  }
}
