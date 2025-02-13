// src/modules/game.js
import DOM from './dom.js';

const Game = (() => {
    const startGame = () => {
        DOM.renderBoards();
    };

    return { startGame };
})();

export default Game;
