const readlineSync = require("readline-sync");

type Player = "X" | "O";

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
  turn = "X";

  boardState = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  isValidMove(move: Move) {
    if (move.row > 2 || move.row < 0) {
      return false;
    }
    if (move.column > 2 || move.column < 0) {
      return false;
    }
    if (move.player !== this.turn) {
      return false;
    }
    if (this.boardState[move.row][move.column] !== null) {
      return false;
    }
    return true;
  }

  makeMove(move: Move) {
    if (!this.isValidMove(move)) {
      throw new Error("Move not allowed");
    }
  }
}

class MoveInputError extends Error {}

const integerRegex = /^\d+$/;

/// Class to encapsulate the logic of accepting, parsing,
/// and validating user input
class Ui {
  static promptInput(game: Game) {
    console.info(`game: Player ${game.turn} - enter row column.`);
    console.info("");
    const input = readlineSync.question(">> ");
    const inputTokenized = input
      .split(/\s+/)
      .filter((partition) => partition !== "");
    if (inputTokenized.length !== 2) {
      throw new MoveInputError("Must provide 2 arguments");
    }
    if (!inputTokenized.some((arg) => integerRegex.test(arg))) {
      throw new MoveInputError("Arguments must be integers");
    }
    const row = Number.parseInt(inputTokenized[0]);
    const column = Number.parseInt(inputTokenized[1]);
    return { player: game.turn, row, column };
  }
}

const main = () => {
  const game = new Game();
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
};

main();
