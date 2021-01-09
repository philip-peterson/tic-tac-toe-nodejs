const readline = require('readline');
const process = require('process');

type Player = 'X' | 'O';

/// Represents a single move made by a particular player.
class Move {
    player: Player;
    row: 0 | 1 | 2;
    column: 0 | 1 | 2;
}

/// Encapsulates the state of the game, allowing
/// input and stepping to be separate from the business
/// logic and rules of play.
class Game {
    // Player X goes first
    // Represents the current player
    turn = 'X';

    boardState = [
        [null,null,null],
        [null,null,null],
        [null,null,null],
    ];

    isValidMove(Move move) {

    }

    makeMove() {
        if (!this.isValidMove(move)) {
            throw new Error("Move not allowed");
        }
    }
}

/// Class to encapsulate the logic of accepting, parsing,
/// and validating user input
class Ui {
    static promptInput(Game game) {

    }
}

const main = () => {
    const game = new Game();
    const ioInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    while (true) {
        let move;
        try {
            move = Ui.promptInput(game);
        } catch (e) {
            console.error(
               `Invalid instruction. Must be two numbers from 0-2 separated by a space.`
            );
        }
    }
}