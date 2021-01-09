type Player = 'X' | 'O';

class Game {
    // Player X goes first
    // Represents the current player
    turn = 'X';

    boardState = [
        [null,null,null],
        [null,null,null],
        [null,null,null],
    ];
    
    promptInput() {

    }

    isValidMove() {

    }
}

const main = () => {
    const game = new Game();
    while (true) {
        let move;
        try {
            move = game.promptInput();
        } catch (e) {
            console.error(
               `Invalid instruction. Must be two numbers from 0-2 separated by a space.`
            );
        }
    }
}