import './css/style.css';
import characterImage from './img/goblin.png';
import { GameController } from './js/GameController.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new GameController();
  game.initialize(characterImage);
});
