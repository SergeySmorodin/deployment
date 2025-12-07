export class GameBoard {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.cells = [];
      this.createBoard();
    }
  
    createBoard() {
      for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        this.container.append(cell);
        this.cells.push(cell);
      }
    }
  
    getRandomCell(excludeIndex = null) {
      let index;
      do {
        index = Math.floor(Math.random() * 16);
      } while (index === excludeIndex);
      return {
        cell: this.cells[index],
        index: index
      };
    }
  }
  