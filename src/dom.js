// src/modules/dom.js
import { PlayerGameBoard, ComputerGameBoard } from './gameBoard.js';
import { PlayerShip, ComputerShip } from './ship.js';

const DOM = (() => {
    const playerBoard = document.querySelector('.player-board');
    const computerBoard = document.querySelector('.computer-board');
    const messageDisplay = document.querySelector('.message');
    const newGameBtn = document.querySelector('.new-game');
    const rotateBtn = document.querySelector('.rotate-ship');

    let playerGameBoard = new PlayerGameBoard();
    let computerGameBoard = new ComputerGameBoard();
    let currentShip = new PlayerShip();
    let playerTurn = true;
    let placingShips = true;
    let gameOver = false;

    const renderBoards = () => {
        playerBoard.innerHTML = '';
        computerBoard.innerHTML = '';

        // Render Player Board
        playerGameBoard.grid.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                const playerCell = document.createElement('div');
                playerCell.classList.add('cell');
                playerCell.id = `player-${rowIndex}-${colIndex}`;
                
                if (playerGameBoard.shipBody.some(([r, c]) => r === rowIndex && c === colIndex)) {
                    playerCell.classList.add('ship');
                }

                if (playerGameBoard.missedAtks.some(([r, c]) => r === rowIndex && c === colIndex)) {
                    playerCell.classList.add('miss');
                }

                if (playerGameBoard.ships.some(ship => 
                    ship.bodyHit.some(([r, c]) => r === rowIndex && c === colIndex))) {
                    playerCell.classList.add('hit');
                }

                playerBoard.appendChild(playerCell);
            });
        });

        // Render Computer Board
        computerGameBoard.grid.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                const compCell = document.createElement('div');
                compCell.classList.add('cell');
                compCell.id = `comp-${rowIndex}-${colIndex}`;

                // Show hits and misses but not ships
                if (computerGameBoard.missedAtks.some(([r, c]) => r === rowIndex && c === colIndex)) {
                    compCell.classList.add('miss');
                }

                if (computerGameBoard.ships.some(ship => 
                    ship.bodyHit.some(([r, c]) => r === rowIndex && c === colIndex))) {
                    compCell.classList.add('hit');
                }

                // Allow attacks only when all ships are placed and game is not over
                if (!placingShips && !gameOver) {
                    compCell.addEventListener('click', () => handleAttack(rowIndex, colIndex));
                }

                computerBoard.appendChild(compCell);
            });
        });
    };

    const placePlayerShip = (row, col) => {
        if (placingShips) {
            const placed = playerGameBoard.placeShip(row, col, currentShip);

            if (placed) {
                currentShip = new PlayerShip();
                if (PlayerShip.availableLengths.length === 0) {
                    placingShips = false;
                    placeComputerShips();
                    updateMessage("All ships placed! Your turn to attack!");
                } else {
                    updateMessage("Place your next ship!");
                }
                renderBoards();
            } else {
                updateMessage("Invalid placement. Try again.");
            }
        }
    };

    const placeComputerShips = () => {
        while (ComputerShip.availableLengths.length > 0) {
            const ship = new ComputerShip();
            computerGameBoard.randPlaceShip(ship);
        }
    };

    const handleAttack = (row, col) => {
        if (!playerTurn || gameOver) return;

        const hitShip = computerGameBoard.ships.find(ship =>
            ship.shipBody.some(([r, c]) => r === row && c === col)
        );

        if (hitShip) {
            computerGameBoard.receiveAtk([row, col]);
            updateMessage(`You attacked (${row}, ${col}) - Hit!`);
        } else {
            computerGameBoard.missedAtks.push([row, col]);
            updateMessage(`You attacked (${row}, ${col}) - Miss!`);
        }

        renderBoards();
        checkWinner();
        
        if (!gameOver) {
            playerTurn = false;
            setTimeout(computerAttack, 1000);
        }
    };

    const computerAttack = () => {
        let randRow, randCol;
        do {
            randRow = Math.floor(Math.random() * 10);
            randCol = Math.floor(Math.random() * 10);
        } while (
            playerGameBoard.missedAtks.some(([r, c]) => r === randRow && c === randCol) ||
            playerGameBoard.ships.some(ship =>
                ship.bodyHit.some(([r, c]) => r === randRow && c === randCol)
            )
        );

        playerGameBoard.receiveAtk([randRow, randCol]);
        updateMessage(`Computer attacked (${randRow}, ${randCol})`);
        playerTurn = true;
        renderBoards();
        checkWinner();
    };

    const checkWinner = () => {
        const playerLost = playerGameBoard.ships.every(ship => ship.isSunk());
        const computerLost = computerGameBoard.ships.every(ship => ship.isSunk());

        if (playerLost) {
            updateMessage("Game Over! Computer Wins!");
            gameOver = true;
        } else if (computerLost) {
            updateMessage("Congratulations! You Win!");
            gameOver = true;
        }
    };

    const updateMessage = (msg) => {
        messageDisplay.textContent = msg;
    };

    const resetGame = () => {
        // Reset available ship lengths for both player and computer
        PlayerShip.availableLengths = [0, 1, 2, 3, 4, 5];
        ComputerShip.availableLengths = [1, 2, 3, 4, 5];
        
        // Reset game boards and other variables
        playerGameBoard = new PlayerGameBoard();
        computerGameBoard = new ComputerGameBoard();
        currentShip = new PlayerShip();
        placingShips = true;
        gameOver = false;
        updateMessage("Place your ships!");
        renderBoards();
    };

    const rotateShip = () => {
        currentShip.changePosition();
        updateMessage(`Ship rotated to ${currentShip.position}`);
    };

    newGameBtn.addEventListener('click', resetGame);
    rotateBtn.addEventListener('click', rotateShip);

    playerBoard.addEventListener('click', (event) => {
        if (!placingShips) return;
        const [_, row, col] = event.target.id.split('-').map(Number);
        placePlayerShip(row, col);
    });

    return { renderBoards };
})();

export default DOM;
