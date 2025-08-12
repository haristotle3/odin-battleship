import GameController from "./GameController";

class DOMInitializationUtilities {
  constructor(gameController) {
    this.gameController = gameController;
  }

  #getShipName(shipID) {
    return shipID.split("-")[2];
  }

  #getPlayerNumber(shipID) {
    return Number(shipID.split("-")[1]);
  }

  #getRealShip(shipID) {
    const playerNumber = this.#getPlayerNumber(shipID);
    const shipName = this.#getShipName(shipID);
    switch (playerNumber) {
      case 1:
        return this.gameController.player1.gameboard.harbour[shipName];
      case 2:
        return this.gameController.player2.gameboard.harbour[shipName];
    }
  }

  #enableShipRotation(ship) {
    ship.addEventListener("click", () => {
      ship.classList.toggle("vertical");
      if (!this.#placeShipDiv(ship.id, ship.parentElement)) {
        ship.classList.toggle("vertical");
      }
    });
  }

  #placeShipDiv(shipID, dropLocation) {
    const SHIP_ID = shipID;
    const shipDropped = document.getElementById(SHIP_ID);

    const realShip = this.#getRealShip(SHIP_ID);
    const [startY, startX] = [
      Number(dropLocation.dataset.row),
      Number(dropLocation.dataset.col),
    ];

    const isHorizontal = !shipDropped.classList.contains("vertical");
    const boardNumber = this.#getPlayerNumber(SHIP_ID);

    switch (boardNumber) {
      case 1:
        if (
          !this.gameController.player1.gameboard.placeShip(
            realShip,
            startY,
            startX,
            isHorizontal
          )
        ) {
          return null;
        }
        break;
      case 2:
        if (
          !this.gameController.player2.gameboard.placeShip(
            realShip,
            startY,
            startX,
            isHorizontal
          )
        ) {
          return null;
        }
        break;
    }

    return 1;
  }

  #shipDropHandler(e, dropLocation) {
    e.preventDefault();
    const SHIP_ID = e.dataTransfer.getData("text");
    const shipDropped = document.getElementById(SHIP_ID);

    if (shipDropped === null) {
      // needed to handle case when some text is dropped over the gameboard instead of ship divs.
      return;
    }

    if (!this.#placeShipDiv(SHIP_ID, dropLocation)) return null;

    if (shipDropped.parentElement.classList.contains("harbour"))
      this.#enableShipRotation(shipDropped);

    const shipParent = shipDropped.parentElement;
    shipParent.removeChild(shipDropped);
    dropLocation.appendChild(shipDropped);

    return;
  }

  #createShip(id, length) {
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

  createBoard(boardID) {
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

        block.addEventListener("drop", (e) => this.#shipDropHandler(e, block));

        board.appendChild(block);
      }

    return board;
  }

  dockShips(playerClass) {
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
    this.domUtils = new DOMInitializationUtilities(this.gameController);

    this.player1BoardDiv = this.domUtils.createBoard("board-1");
    this.player2BoardDiv = this.domUtils.createBoard("board-2");
    this.player1HarbourDiv = this.domUtils.dockShips(`player-1`);
    this.player2HarbourDiv = this.domUtils.dockShips(`player-2`);
  }
}
