import Gameboard from "../src/gameboardClass.js";
import Ship from "../src/shipClass.js";

const gameboard = new Gameboard();
const destroyer = new Ship(2, "Destroyer");
const submarine = new Ship(3, "Submarine");
const battleship = new Ship(4, "Battleship");

describe("Test Gameboard ship placement", () => {
  test("Place destroyer (valid coordinate) (1)", () => {
    expect(gameboard.placeShip(destroyer, 0, 0, true)).toBe(1);
  });

  test("Place submarine (overlapping with other ships) (1)", () => {
    expect(gameboard.placeShip(submarine, 0, 0, true)).toBe(0);
  });

  test("Place submarine (overlapping with other ships) (2)", () => {
    expect(gameboard.placeShip(submarine, 0, 1, true)).toBe(0);
  });

  test("Place destroyer (valid coordinate) (2)", () => {
    expect(gameboard.placeShip(destroyer, 4, 0, false)).toBe(1);
  });

  test("Place submarine (overlapping with other ships) (3)", () => {
    expect(gameboard.placeShip(submarine, 3, 0, false)).toBe(0);
  });

  test("Place destroyer (invalid coordinate) (out of bounds) (1)", () => {
    expect(gameboard.placeShip(destroyer, 9, 1, false)).toBe(0);
  });

  test("Place battleship (valid coordinate) (1)", () => {
    expect(gameboard.placeShip(battleship, 0, 1, true)).toBe(1);
  });

  test("Place battleship (valid coordinate) (2)", () => {
    expect(gameboard.placeShip(battleship, 1, 6, true)).toBe(1);
  });

  test("Place submarine (overlapping with other ships) (4)", () => {
    expect(gameboard.placeShip(submarine, 1, 5, true)).toBe(0);
  });

  test("Place submarine (overlapping with other ships) (5)", () => {
    expect(gameboard.placeShip(submarine, 1, 4, true)).toBe(0);
  });

  test("Place battleship (invalid coordinate) (out of bounds) (1)", () => {
    expect(gameboard.placeShip(battleship, 0, 9, true)).toBe(0);
  });

  test("Place battleship (invalid coordinate) (out of bounds) (2)", () => {
    expect(gameboard.placeShip(battleship, 0, 8, true)).toBe(0);
  });

  test("Place battleship (invalid coordinate) (out of bounds) (3)", () => {
    expect(gameboard.placeShip(battleship, 1, 7, true)).toBe(0);
  });

  test("Place battleship (invalid coordinate) (out of bounds) (4)", () => {
    expect(gameboard.placeShip(battleship, 8, 7, false)).toBe(0);
  });

  test("Place battleship (invalid coordinate) (out of bounds) (5)", () => {
    expect(gameboard.placeShip(battleship, 8, 8, false)).toBe(0);
  });
});

describe("Test Gameboard receive attack functionality", () => {
  test("Missed shot (0)", () => {
    expect(gameboard.receiveAttack(5, 5)).toBe(0);
  });

  test("Missed shot (1)", () => {
    expect(gameboard.receiveAttack(0, 2)).toBe(0);
  });

  test("Hit (0)", () => {
    expect(gameboard.receiveAttack(4, 0)).toBe(1);
  });

  test("Hit (1)", () => {
    expect(gameboard.receiveAttack(5, 0)).toBe(1);
  });

  test("Invalid shot (0)", () => {
    expect(gameboard.receiveAttack(5, 5)).toBe(-1);
  });

  test("Invalid shot (1)", () => {
    expect(gameboard.receiveAttack(0, 2)).toBe(-1);
  });

  test("Invalid shot (2)", () => {
    expect(gameboard.receiveAttack(4, 0)).toBe(-1);
  });

  test("Invalid shot (3)", () => {
    expect(gameboard.receiveAttack(5, 0)).toBe(-1);
  });
});
