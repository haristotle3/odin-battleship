export default class Ship {
  #damageArray;
  constructor(shipLength) {
    this.length = shipLength;
    this.timesHit = 0;
    this.#damageArray = new Array(this.length).fill(false);
  }

  hit(location) {
    if (location < 0 || location >= this.length)
      throw new Error("Is not a hit");

    this.timesHit++;
    this.#damageArray[location] = true;
    
    return 0;
  }
}
