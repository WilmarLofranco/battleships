import { PlayerGameBoard, ComputerGameBoard } from "./gameBoard.js";
import { PlayerShip, ComputerShip } from "./ship.js";



const comShip1 = new ComputerShip();
const comShip2 = new ComputerShip();
const comShip3 = new ComputerShip();
console.log(comShip2.type)

const computerBoard = new ComputerGameBoard();
computerBoard.randPlaceShip(comShip1);
computerBoard.randPlaceShip(comShip1);
computerBoard.randPlaceShip(comShip3);

const lengths = [comShip1.length, comShip2.length, comShip3.length];
const types = [comShip1.type, comShip2.type, comShip3.type];
console.log(lengths);
console.log(types);
console.log(computerBoard.grid);