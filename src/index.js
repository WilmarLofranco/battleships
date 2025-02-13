// src/index.js
import Game from './game.js';
import { PlayerGameBoard } from './gameBoard.js';
import { PlayerShip } from './ship.js';
import './styles.css';

document.addEventListener('DOMContentLoaded', Game.startGame);

console.log(PlayerShip.availableLengths)