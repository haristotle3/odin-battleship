import Ship from "../src/shipClass.js";

describe("Test Ship Class", () => {
  const carrier = new Ship(5, "Carrier");
  const cruiser = new Ship(3, "Cruiser");

  test("Carrier Length", () => {
    expect(carrier.length).toBe(5);
  });

  test("Carrier times hit", () => {
    expect(carrier.timesHit).toBe(0);
  });

  test("Hit Carrier (0)", () => {
    expect(carrier.hit(0)).toBe(0);
  });

  test("Hit Carrier (1)", () => {
    expect(carrier.hit(1)).toBe(0);
  });

  test("Hit Carrier (2)", () => {
    expect(carrier.hit(2)).toBe(0);
  });

  test("Hit Carrier (invalid)", () => {
    expect(() => carrier.hit(6)).toThrow(Error("Is not a hit"));
  });

  test("Sink Carrier (not sunk)", () => {
    expect(carrier.isSunk()).toBe(false);
  });

  test("Hit Carrier (3)", () => {
    expect(carrier.hit(3)).toBe(0);
  });

  test("Hit Carrier (4)", () => {
    expect(carrier.hit(4)).toBe(0);
  });

  test("Sink Carrier (sunk)", () => {
    expect(carrier.isSunk()).toBe(true);
  });

  test("Cruiser Length", () => {
    expect(cruiser.length).toBe(3);
  });

  test("Cruiser times hit", () => {
    expect(cruiser.timesHit).toBe(0);
  });

  test("Hit Cruiser (0)", () => {
    expect(cruiser.hit(0)).toBe(0);
  });

  test("Hit Cruiser (1)", () => {
    expect(cruiser.hit(1)).toBe(0);
  });

  test("Sink Cruiser (not sunk)", () => {
    expect(cruiser.isSunk()).toBe(false);
  });

  test("Hit Cruiser (2)", () => {
    expect(cruiser.hit(2)).toBe(0);
  });

  test("Hit Cruiser (invalid)", () => {
    expect(() => cruiser.hit(4)).toThrow(Error("Is not a hit"));
  });

  test("Sink Cruiser (sunk)", () => {
    expect(cruiser.isSunk()).toBe(true);
  });
});
