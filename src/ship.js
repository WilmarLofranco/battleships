// ship.js

class Ship {
    static shipTypes = {
        1: "Fish Boat",
        2: "Patrol Boat",
        3: "Destroyer",
        4: "Submarine",
        5: "Battleship",
    };

    constructor(position = "horizontal") {
        // checks if there is more than 5 ships
        if(this.constructor.availableLengths.length === 0) {
            throw new Error ("All ships has deployed!")
        }
        // if ships.length < 4, make ship instance w/ length, position, coordinates, name
        this.length = this.constructor.availableLengths.splice(-1, 1)[0];
        this.position = position;
        this.shipBody = []; //this get assigned in the gameboard
        this.type = Ship.shipTypes[this.length];
        this.hp = this.length;
        this.bodyHit = [];
        
    }

    
    hit([atkX, atkY]) {
        this.hp --; //decreases hp by 1 when hit (gameBoard.js will check if hit or not)
        this.bodyHit.push([atkX, atkY]); //send the atk coordinates to hitBody if hit
        console.log("Ship hit! Current hp:", this.hp);
    }

    isSunk() {
        // returns true if all coordinates of this ship instance gets hit
        return this.hp ===0;

    }
}

class PlayerShip extends Ship {
    static availableLengths = [0, 1, 2, 3, 4, 5];
    constructor(position="horizontal") {
        super(position);
    }
    // change ship position (bring to gameBoard.js)
    changePosition() {
        this.position = this.position === "horizontal" ? "vertical" : "horizontal";
        
    }
}

class ComputerShip extends Ship {
    static availableLengths = [1, 2, 3, 4, 5];
    constructor () {
        const randomPosition = Math.random() < 0.5 ? "horizontal" : "vertical";
        super(randomPosition);
    }
    

}

export { Ship, PlayerShip, ComputerShip }