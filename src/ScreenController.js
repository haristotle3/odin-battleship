import GameController from "./GameController";

class DOMInitializationUtilities {
  constructor() {}

  static #getShipName(shipID) {
    return shipID.split("-")[2];
  }

  static #getRealShip(gameboard, shipID) {
    const shipName = this.#getShipName(shipID);
    return gameboard.harbour[shipName];
  }

  static #enableShipRotation(gameboard, ship) {
    ship.addEventListener("click", () => {
      ship.classList.toggle("vertical");
      if (!this.#placeShipDiv(gameboard, ship.id, ship.parentElement)) {
        ship.classList.toggle("vertical");
      }
    });
  }

  static #placeShipDiv(gameboard, shipID, dropLocation) {
    const SHIP_ID = shipID;
    const shipDropped = document.getElementById(SHIP_ID);

    const realShip = this.#getRealShip(gameboard, SHIP_ID);
    const [startY, startX] = [
      Number(dropLocation.dataset.row),
      Number(dropLocation.dataset.col),
    ];

    const isHorizontal = !shipDropped.classList.contains("vertical");

    if (!gameboard.placeShip(realShip, startY, startX, isHorizontal)) {
      return null;
    }
    return 1;
  }

  static #shipDropHandler(e, gameboard, dropLocation) {
    e.preventDefault();
    const SHIP_ID = e.dataTransfer.getData("text");
    const shipDropped = document.getElementById(SHIP_ID);

    if (shipDropped === null) {
      // needed to handle case when some text is dropped over the gameboard instead of ship divs.
      return;
    }

    if (!this.#placeShipDiv(gameboard, SHIP_ID, dropLocation)) return null;

    if (shipDropped.parentElement.classList.contains("harbour"))
      this.#enableShipRotation(gameboard, shipDropped);

    const shipParent = shipDropped.parentElement;
    shipParent.removeChild(shipDropped);
    dropLocation.appendChild(shipDropped);

    return;
  }

  static #createShip(id, length) {
    const ship = document.createElement("div");
    ship.classList.add("ship");
    ship.id = id;
    ship.style.width = `${length * 40}px`;
    ship.draggable = true;

    ship.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", ship.id);
      setTimeout(() => ship.classList.toggle("dragging"), 0);
    });

    ship.addEventListener("dragend", () => {
      ship.classList.toggle("dragging");
    });

    return ship;
  }

  static createBoard(gameboard, boardID) {
    const board = document.querySelector(`#${boardID}`);
    board.style.position = "relative";
    board.style.zIndex = 1;

    for (let row = 0; row < 10; row++)
      for (let col = 0; col < 10; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.dataset.col = col;
        block.dataset.row = row;

        block.addEventListener("dragover", (e) => {
          e.preventDefault();
        });

        block.addEventListener("drop", (e) =>
          this.#shipDropHandler(e, gameboard, block)
        );

        board.appendChild(block);
      }

    return board;
  }

  static dockShips(playerClass) {
    const harbour = document.querySelector(`.${playerClass} .harbour`);

    harbour.appendChild(this.#createShip(`${playerClass}-carrier`, 5));
    harbour.appendChild(this.#createShip(`${playerClass}-battleship`, 4));
    harbour.appendChild(this.#createShip(`${playerClass}-cruiser`, 3));
    harbour.appendChild(this.#createShip(`${playerClass}-submarine`, 3));
    harbour.appendChild(this.#createShip(`${playerClass}-destroyer`, 2));

    return;
  }
}
export default class ScreenController {
  constructor() {
    this.gameController = new GameController();
    this.player1 = this.gameController.player1;
    this.player2 = this.gameController.player2;

    this.player1BoardDiv = DOMInitializationUtilities.createBoard(
      this.player1.gameboard,
      "board-1"
    );
    this.player2BoardDiv = DOMInitializationUtilities.createBoard(
      this.player2.gameboard,
      "board-2"
    );
    this.player1HarbourDiv = DOMInitializationUtilities.dockShips(`player-1`);
    this.player2HarbourDiv = DOMInitializationUtilities.dockShips(`player-2`);
  }
}
