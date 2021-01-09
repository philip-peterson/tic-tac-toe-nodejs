const readlineSync = require("readline-sync");

type Player = "X" | "O";

/// Represents a single move made by a particular player.
class Move {
  player: Player;
  row: 0 | 1 | 2;
  column: 0 | 1 | 2;
}

/// A single point on the grid
type Point = [0 | 1 | 2, 0 | 1 | 2];

/// Encapsulates the state of the game, allowing
/// input and stepping to be separate from the business
/// logic and rules of play.
export class Game {
  // Player X goes first
  // Represents the current player
  turn = "X";

  boardState: [
    [Player | null, Player | null, Player | null],
    [Player | null, Player | null, Player | null],
    [Player | null, Player | null, Player | null]
  ] = [
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

  hasStreak(coord1: Point, coord2: Point, coord3: Point): Player | false {
    const v1 = this.boardState[coord1[0]][coord1[1]];
    const v2 = this.boardState[coord2[0]][coord2[1]];
    const v3 = this.boardState[coord3[0]][coord3[1]];

    if (v1 === v2 && v2 === v3 && v1 !== null) {
      return v1;
    }
    return false;
  }

  // A winning game occurs when there is a streak of three,
  // so we test for all possible streaks of three.
  getWinner() {
    const streaks = [
      // horizontal streaks
      // i.e. ooo
      this.hasStreak([0, 0], [0, 1], [0, 2]),
      this.hasStreak([1, 0], [1, 1], [1, 2]),
      this.hasStreak([2, 0], [2, 1], [2, 2]),

      // vertical streaks
      // o
      // o
      // o
      this.hasStreak([0, 0], [1, 0], [2, 0]),
      this.hasStreak([0, 1], [1, 1], [2, 1]),
      this.hasStreak([0, 2], [1, 2], [2, 2]),

      // diagonal streaks
      // o
      //   o
      //     o
      this.hasStreak([0, 0], [1, 1], [2, 2]),
      this.hasStreak([0, 2], [1, 1], [2, 0]),
    ];

    if (streaks.every((streak) => streak === false)) {
      return null;
    }
    return streaks.find((streak) => streak !== false);
  }

  anyMovesLeft() {
    return this.boardState.some((row) => row.some((col) => col === null));
  }

  printBoard() {
    for (let row = 0; row <= 2; row++) {
      for (let col = 0; col <= 2; col++) {
        if (col === 0) {
          process.stdout.write("|");
        }
        process.stdout.write(
          `${(this.boardState[row][col] || " ").toLowerCase()}`
        );
        process.stdout.write("|");
      }
      process.stdout.write("\n");
    }
  }

  makeMove(move: Move) {
    if (!this.isValidMove(move)) {
      throw new Error("Move not allowed");
    }

    this.boardState[move.row][move.column] = move.player;
    this.turn = this.turn === "O" ? "X" : "O";
  }
}

class MoveInputError extends Error {}

const integerRegex = /^\d+$/;

/// Class to encapsulate the logic of accepting, parsing,
/// and validating user input
export class Ui {
  static promptInput(game: Game) {
    console.info(`game: Player ${game.turn} - enter row column.`);
    console.info("");
    const input = readlineSync.question(">> ");
    console.info("");
    return Ui.parseMove(game, input);
  }

  static printWinner(winner: Player) {
    console.info(`game: Player ${winner.toLowerCase()} wins!`);
  }

  static printCatsGame() {
    console.info(`game: Cat's game. Nobody wins!`);
  }

  /// Takes raw user input and turns it into a move. The move may not
  /// be valid. May throw if input is invalid.
  static parseMove(game: Game, input: string) {
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
    if (row > 2 || row < 0) {
      throw new MoveInputError("Row must be in range 0 - 2");
    }
    if (column > 2 || column < 0) {
      throw new MoveInputError("Column must be in range 0 - 2");
    }
    return { player: game.turn, row, column };
  }
}

const main = () => {
  const game = new Game();
  while (true) {
    game.printBoard();
    console.info("");

    // Check for any ending conditions.
    const winner = game.getWinner();
    if (winner) {
      Ui.printWinner(winner);
      break;
    }
    if (!game.anyMovesLeft()) {
      Ui.printCatsGame();
      break;
    }

    // Now try to collect a move from the player.
    let move;
    try {
      move = Ui.promptInput(game);
    } catch (e) {
      console.error(`Invalid instruction. ${e.message}`);
    }
    if (!move) {
      // prompt again, if there was an exception
      continue;
    }
    if (!game.isValidMove(move)) {
      // TODO more explanatory error message here
      console.error("That move is not valid at the present time.");
      console.error("");
      continue;
    }

    // If we've gotten here, there's nothing to stop the player
    // from making a move.
    game.makeMove(move);
  }
  while (true) {}
};

// Only run main when not in a testing situation
if (require.main === module) {
  main();
}
