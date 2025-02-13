// gameBoard.js


class GameBoard {
    
    constructor() { 
        this.grid = Array.from({ length: 10 }, (_, row) =>
        Array.from({ length: 10 }, (_, col) => [row, col]));
        this.missedAtks = [];
        this.shipBody = [];
        this.ships = [];
        this.hits = [];
    }
    receiveAtk([atkX, atkY]) {
        let hitShip = this.ships.find(ship => 
            ship.shipBody.some(([r, c]) => r === atkX && c === atkY)
        );
    
        if (hitShip) {
            hitShip.hit([atkX, atkY]);
            if (hitShip.isSunk()) {
                console.log(`${hitShip.type} has been sunk!`);
            }
            return true;  // Return true if a ship was hit
        } else {
            this.missedAtks.push([atkX, atkY]);
            return false; // Return false if it was a miss
        }
    }
}

class PlayerGameBoard extends GameBoard {
    constructor() {
        super();
        
        
    }   
    reset() {
        this.grid = Array.from({ length: 10 }, (_, row) =>
            Array.from({ length: 10 }, (_, col) => [row, col])
        );
    }
    placeShip(startRow, startCol, ship) {
        let newShipBody = []; 

        // checks if shipbody does not go beyond the board
        if (
            (ship.position === "horizontal" && startCol + ship.length > 10) ||
            (ship.position === "vertical" && startRow + ship.length > 10)
        ) {
            return false; // stops placement if goes beyond
        }

        // push coordinates as ship's body
        for (let i=0; i < ship.length; i++) {
            if (ship.position === "horizontal") {
                newShipBody.push([startRow, startCol + i])
            } else {
                newShipBody.push([startRow + i, startCol])
            }
        }

        if (newShipBody.some(([row, col]) => 
            this.shipBody.some(([r, c]) => r === row && c === col))) {
            return false; // Prevent overlap
        }

        ship.shipBody = newShipBody;
        this.shipBody.push(...newShipBody);
        this.ships.push(ship);
        return true;
    }

}

class ComputerGameBoard extends GameBoard {
    constructor() {
        super();
    } 

    reset() {
        this.grid = Array.from({ length: 10 }, (_, row) =>
            Array.from({ length: 10 }, (_, col) => [row, col])
        );
    }
    
    randPlaceShip(ship) {
        let validPlacement = false;
        let newShipBody = [];
        let startRow, startCol;
        let attempts = 0;

        while (!validPlacement && attempts < 100) {
            newShipBody = [];
            startRow = Math.floor(Math.random() * 10);
            startCol = Math.floor(Math.random() * 10);

            if (
                (ship.position === "horizontal" && startCol + ship.length > 10) ||
                (ship.position === "vertical" && startRow + ship.length > 10)
            ) {
                attempts++;
                continue;
            }

            for (let i=0; i < ship.length; i++) {
                if (ship.position === "horizontal") {
                    newShipBody.push([startRow, startCol + i])
                } else {
                    newShipBody.push([startRow + i, startCol])
                }
            }

            validPlacement = newShipBody.every(([row, col]) => 
                !this.shipBody.some(([r, c]) => r === row && c === col)
            );   
            attempts++;
        }

        if(validPlacement){
        ship.shipBody = newShipBody;
        this.shipBody.push(...newShipBody);
        this.ships.push(ship);
        return true;
        }
        return false;
    }

}

export { PlayerGameBoard, ComputerGameBoard };
