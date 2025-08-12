export default class Ship {
  constructor(shipLength, name) {
    this.length = shipLength;
    this.name = name;
    this.timesHit = 0;
  }

  hit() {
    if (this.isSunk()) throw new Error(`${this.name} already sunk`);

    this.timesHit++;
    return 0;
  }

  isSunk() {
    return this.timesHit === this.length;
  }
}
export class Harbour {
  constructor() {
    this.carrier = new Ship(5, "Carrier");
    this.battleship = new Ship(4, "Battleship");
    this.cruiser = new Ship(3, "Cruiser");
    this.submarine = new Ship(3, "Submarine");
    this.destroyer = new Ship(2, "Destroyer");
  }
}
