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
