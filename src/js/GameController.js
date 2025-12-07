import { GameBoard } from './GameBoard.js';
import { Character } from './Character.js';
import { ScoreManager } from './ScoreManager.js';
import { MissManager } from './MissManager.js';
import { CustomCursor } from './CustomCursor.js';

export class GameController {
  constructor() {
    this.board = new GameBoard('game-board');
    this.character = null;
    this.scoreManager = new ScoreManager();
    this.missManager = new MissManager();
    this.cursor = new CustomCursor();
    this.isRunning = false;
    this.currentCharacterIndex = null;
    this.characterTimeout = null;
    this.nextAppearanceTimeout = null;
    this.restartHandler = () => {
      const gameOverScreen = document.getElementById('game-over');
      if (gameOverScreen) {
        gameOverScreen.style.display = 'none';
      }
      this.start();
    };
  }

  initialize(characterImage) {
    this.character = new Character(characterImage);
    this.setupEventListeners();
    this.cursor.setup()
  }
  
  setupEventListeners() {
    this.board.container.addEventListener('click', (event) => {
      if (!this.isRunning || !this.character.isVisible) return;
      if (this.character.isClicked(event)) {
        this.onCharacterClick();
      }
    });

    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    
    if (startBtn) {
      startBtn.addEventListener('click', () => this.start());
    }
    if (stopBtn) {
      stopBtn.addEventListener('click', () => this.stop());
    }
  }

  onCharacterClick() {
    this.scoreManager.increase();
    this.character.hide();
    
    clearTimeout(this.characterTimeout);
    this.scheduleNextAppearance();
  }

  showCharacter() {
    const { cell, index } = this.board.getRandomCell(this.currentCharacterIndex);
    this.currentCharacterIndex = index;
    this.character.showInCell(cell);
    
    this.characterTimeout = setTimeout(() => {
      if (this.character.isVisible) {
        this.character.hide();
        const gameOver = this.missManager.addMiss();
        if (gameOver) {
          this.gameOver();
        } else {
          this.scheduleNextAppearance();
        }
      }
    }, 1000);
  }

  scheduleNextAppearance() {
    if (!this.isRunning) return;
    if (this.nextAppearanceTimeout) {
      clearTimeout(this.nextAppearanceTimeout);
    }
    
    // Случайная задержка после попадания по гоблину
    const delay = 500 + Math.random() * 1000;
    
    this.nextAppearanceTimeout = setTimeout(() => {
      if (this.isRunning) {
        this.showCharacter();
      }
      this.nextAppearanceTimeout = null;
    }, delay);
  }

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.scoreManager.reset();
    this.missManager.reset();
    this.showCharacter();
    
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    if (startBtn) startBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    
    clearTimeout(this.characterTimeout);
    clearTimeout(this.nextAppearanceTimeout);
    
    this.character.hide(true);
    
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    if (startBtn) startBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;
  }

  gameOver() {
    this.stop();
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    
    if (finalScoreElement) {
      finalScoreElement.textContent = this.scoreManager.score;
    }
    
    if (gameOverScreen) {
      gameOverScreen.style.display = 'flex';
      
      const restartBtn = document.getElementById('restart-btn');
      if (restartBtn) {
        restartBtn.removeEventListener('click', this.restartHandler);
        restartBtn.addEventListener('click', this.restartHandler);
      }
    } else {
      setTimeout(() => {
        alert(`Игра окончена! Ваш счет: ${this.scoreManager.score}`);
      }, 500);
    }
  }
}
