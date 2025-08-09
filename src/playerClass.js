import { Harbour } from "./shipClass.js";

export default class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
    this.ships = new Harbour();
  }
}
