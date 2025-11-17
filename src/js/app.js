import "../css/style.css";
import characterImage from "../img/goblin.png";

export class Game {
  constructor() {
    this.cells = [];
    this.interval = null;
    this.isRunning = false;
    this.createGameBoard();
    this.createCharacter();
    this.bindControlButtons();
    this.startGame();
  }

  getRandomIndex(exclude = null) {
    let index;
    do {
      index = Math.floor(Math.random() * 16);
    } while (index === exclude);
    return index;
  }

  createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;
      gameBoard.append(cell);
      this.cells.push(cell);
    }
  }

  createCharacter() {
    this.character = document.createElement("img");
    this.character.src = characterImage;
    this.character.className = "character";
    this.character.alt = "Game Character";
    this.cells[this.getRandomIndex()].append(this.character);
  }

  startMovement() {
    this.interval = setInterval(() => {
      const current = parseInt(this.character.parentElement.dataset.index);
      const newIndex = this.getRandomIndex(current);
      const newCell = this.cells[newIndex];

      this.character.style.opacity = "0";
      this.character.style.transform = "scale(0.5)";

      setTimeout(() => {
        newCell.append(this.character);
        this.character.style.opacity = "1";
        this.character.style.transform = "scale(1)";
      }, 1000);
    }, 2000);
  }

  startGame() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startMovement();
    this.updateButtonsState();
    console.log("Игра запущена");
  }

  stopGame() {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.updateButtonsState();
    console.log("Игра остановлена");
  }

  bindControlButtons() {
    const controlsContainer = document.createElement("div");
    controlsContainer.className = "game-controls";

    this.startButton = document.createElement("button");
    this.startButton.id = "start-btn";
    this.startButton.className = "control-btn start-btn";
    this.startButton.textContent = "Старт";

    this.stopButton = document.createElement("button");
    this.stopButton.id = "stop-btn";
    this.stopButton.className = "control-btn stop-btn";
    this.stopButton.textContent = "Стоп";

    controlsContainer.append(this.startButton, this.stopButton);
    const gameContainer = document.querySelector(".game-container");
    gameContainer.after(controlsContainer);

    this.startButton.addEventListener("click", () => this.startGame());
    this.stopButton.addEventListener("click", () => this.stopGame());

    this.updateButtonsState();
  }

  updateButtonsState() {
    if (this.startButton && this.stopButton) {
      this.startButton.disabled = this.isRunning;
      this.stopButton.disabled = !this.isRunning;
    }
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => new Game());
}
