export default class Gameboard {
  #ROW_SIZE = 10;
  #COL_SIZE = 10;
  #ATTACKED = -1;

  constructor() {
    this.board = Array.from({ length: this.#ROW_SIZE }, () =>
      new Array(this.#COL_SIZE).fill(null)
    );
    this.shipLocations = new Map();
  }

  #isValidStartLocation(shipLength, startY, startX, isHorizontal) {
    if (isHorizontal) {
      return startX - 1 + shipLength < this.#COL_SIZE;
    } else {
      return startY - 1 + shipLength < this.#ROW_SIZE;
    }
  }

  #isShipOverlapping(shipLength, startY, startX, isHorizontal) {
    if (isHorizontal) {
      for (let col = startX; col < startX + shipLength; col++)
        if (this.board[startY][col] != null) return true;
    } else {
      for (let row = startY; row < startY + shipLength; row++)
        if (this.board[row][startX] != null) return true;
    }

    return false;
  }

  placeShip(ship, startY, startX, isHorizontal) {
    if (!this.#isValidStartLocation(ship.length, startY, startX, isHorizontal))
      return 0;

    if (this.#isShipOverlapping(ship.length, startY, startX, isHorizontal))
      return 0;

    // get placement coordinates
    const shipPlacementCoordinates = [];
    if (isHorizontal) {
      for (let col = startX; col < startX + ship.length; col++)
        shipPlacementCoordinates.push([startY, col]);
    } else {
      for (let row = startY; row < startY + ship.length; row++)
        shipPlacementCoordinates.push([row, startX]);
    }

    // remove ship from old location
    if (this.shipLocations.get(ship.name)) {
      const oldPlacementCoordinates = this.shipLocations.get(ship.name);
      oldPlacementCoordinates.forEach((coordinate) => {
        const [y, x] = [coordinate[0], coordinate[1]];
        this.board[y][x] = null;
      });
    }

    // save to map
    this.shipLocations.set(ship.name, shipPlacementCoordinates);
    // update board
    shipPlacementCoordinates.forEach((coordinate) => {
      const [y, x] = [coordinate[0], coordinate[1]];
      this.board[y][x] = ship;
    });

    return 1;
  }

  receiveAttack(y, x) {
    // returns -1 on invalid shot
    // returns 0 on missed shot
    // returns 1 on hit

    // handle invalid shot (already attacked)
    if (this.board[y][x] === this.#ATTACKED) return -1;

    // handle missed shot
    if (this.board[y][x] === null) {
      this.board[y][x] = this.#ATTACKED;
      return 0;
    }

    // handle hits
    const hitShip = this.board[y][x];
    hitShip.hit();
    this.board[y][x] = this.#ATTACKED;

    return 1;
  }
}
