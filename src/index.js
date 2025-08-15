import "./styles.css";
import {
  HumanGameController,
  ComputerGameController,
} from "./GameController.js";
import {
  ComputerGameScreenController,
  HumanGameScreenController,
} from "./ScreenController.js";
import {
  DOMComputerGameInitializer,
  DOMHumanGameInitializer,
  playComputerButton,
  playHumanButton,
} from "./DOMInitializer.js";

playComputerButton.addEventListener("click", () => {
  const gc = new ComputerGameController("Player");
  new DOMComputerGameInitializer(gc);
  new ComputerGameScreenController(gc);
});

playHumanButton.addEventListener("click", () => {
  const gc = new HumanGameController("Player 1", "Player 2");
  new DOMHumanGameInitializer(gc);
  new HumanGameScreenController(gc);
});
