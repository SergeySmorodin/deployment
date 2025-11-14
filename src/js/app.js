import "../css/style.css";
import characterImage from "../img/goblin.png";


export class Game {
  constructor() {
    this.cells = [];
    this.createGameBoard();
    this.createCharacter();
    this.startMovement();
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
      gameBoard.appendChild(cell);
      this.cells.push(cell);
    }
  }

  createCharacter() {
    this.character = document.createElement("img");
    this.character.src = characterImage;
    this.character.className = "character";
    this.character.alt = "Game Character";
    this.cells[this.getRandomIndex()].appendChild(this.character);
  }

  startMovement() {
    setInterval(() => {
      const current = parseInt(this.character.parentElement.dataset.index);
      this.cells[this.getRandomIndex(current)].appendChild(this.character);
    }, 2000);
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => new Game());
}

