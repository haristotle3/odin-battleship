export default class Ship {
  constructor(shipLength) {
    this.length = shipLength;
    this.timesHit = 0;
  }

  hit(location) {
    if (location < 0 || location >= this.length)
      throw new Error("Is not a hit");
    this.timesHit++;
    return 0;
  }

  isSunk() {
    return this.timesHit === this.length;
  }
}
