import { Harbour } from "./ShipClass";

const ATTACKED = -1;
const ALL_SHIPS_SUNK = 100;

export { ATTACKED, ALL_SHIPS_SUNK };
export default class Gameboard {
  #ROW_SIZE = 10;
  #COL_SIZE = 10;

  constructor() {
    this.board = Array.from({ length: this.#ROW_SIZE }, () =>
      new Array(this.#COL_SIZE).fill(null)
    );
    this.harbour = new Harbour();
    this.shipLocations = new Map();
    this.ships = new Set();
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

  #getPlacementCoordinates(ship, startY, startX, isHorizontal) {
    const shipPlacementCoordinates = [];
    if (isHorizontal) {
      for (let col = startX; col < startX + ship.length; col++)
        shipPlacementCoordinates.push([startY, col]);
    } else {
      for (let row = startY; row < startY + ship.length; row++)
        shipPlacementCoordinates.push([row, startX]);
    }

    return shipPlacementCoordinates;
  }

  #saveToMapAndSet(ship, shipPlacementCoordinates) {
    this.shipLocations.set(ship.name, shipPlacementCoordinates);
    this.ships.add(ship);
    // update board
    shipPlacementCoordinates.forEach((coordinate) => {
      const [y, x] = [coordinate[0], coordinate[1]];
      this.board[y][x] = ship;
    });
    return;
  }

  placeShip(ship, startY, startX, isHorizontal) {
    // remove ship from old location
    let oldStartX, oldStartY, oldIsHorizontal;
    if (this.shipLocations.get(ship.name)) {
      const oldPlacementCoordinates = this.shipLocations.get(ship.name);
      [oldStartY, oldStartX] = [
        oldPlacementCoordinates[0][0],
        oldPlacementCoordinates[0][1],
      ];
      oldIsHorizontal = (() => {
        if (oldPlacementCoordinates[1][0] === oldStartY) return true;
        return false;
      })();

      oldPlacementCoordinates.forEach((coordinate) => {
        const [y, x] = [coordinate[0], coordinate[1]];
        this.board[y][x] = null;
      });
      this.shipLocations.set(ship.name, []);
    }

    if (
      !this.#isValidStartLocation(ship.length, startY, startX, isHorizontal) ||
      this.#isShipOverlapping(ship.length, startY, startX, isHorizontal)
    ) {
      if (this.shipLocations.get(ship.name)) {
        const shipOldPlacementCoordinates = this.#getPlacementCoordinates(
          ship,
          oldStartY,
          oldStartX,
          oldIsHorizontal
        );
        this.#saveToMapAndSet(ship, shipOldPlacementCoordinates);
      }
      return 0;
    }

    const shipPlacementCoordinates = this.#getPlacementCoordinates(
      ship,
      startY,
      startX,
      isHorizontal
    );
    this.#saveToMapAndSet(ship, shipPlacementCoordinates);

    return 1;
  }

  #allShipsSunk() {
    const shipsArray = [...this.ships];
    return shipsArray.every((ship) => ship.isSunk());
  }

  allShipsPlaced() {
    return Object.keys(this.harbour).every((ship) =>
      this.ships.has(this.harbour[ship])
    );
  }

  receiveAttack(y, x) {
    // returns -1 on invalid shot
    // returns 0 on missed shot
    // returns 1 on hit
    // returns 100 on all ships sunk

    // handle invalid shot (already attacked)
    if (this.board[y][x] === ATTACKED) return -1;

    // handle missed shot
    if (this.board[y][x] === null) {
      this.board[y][x] = ATTACKED;
      return 0;
    }

    // handle hits
    const hitShip = this.board[y][x];
    hitShip.hit();
    this.board[y][x] = ATTACKED;

    if (this.#allShipsSunk()) return ALL_SHIPS_SUNK;

    return 1;
  }
}
