import Gameboard from "../src/gameboardClass.js";
import Ship from "../src/shipClass.js";

describe("Test Gameboard ship placement", () => {
  const gameboard = new Gameboard();
  const destroyer = new Ship(2);
  const submarine = new Ship(3);
  const battleship = new Ship(4);

  test("Place destroyer (valid coordinate) (1)", () => {
    expect(gameboard.placeShip(destroyer, 0, 0, true)).toBe(1);
  });

  test("Place submarine (overlapping with other ships) (1)", () => {
    expect(gameboard.placeShip(submarine, 0, 0), true).toBe(0);
  });

  test("Place submarine (overlapping with other ships) (2)", () => {
    expect(gameboard.placeShip(submarine, 0, 1), true).toBe(0);
  });

  test("Place destroyer (valid coordinate) (2)", () => {
    expect(gameboard.placeShip(destroyer, 4, 0, false)).toBe(1);
  });

  test("Place submarine (overlapping with other ships) (3)", () => {
    expect(gameboard.placeShip(submarine, 3, 0), false).toBe(0);
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
    expect(gameboard.placeShip(submarine, 1, 5), true).toBe(0);
  });

  test("Place submarine (overlapping with other ships) (5)", () => {
    expect(gameboard.placeShip(submarine, 1, 4), true).toBe(0);
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
