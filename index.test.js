const { Game, Ui } = require("./index");

describe("Game lifecycle", () => {
  it("Should handle happy path", () => {
    const game = new Game();
    expect(game.getWinner()).toBe(null);
    expect(game.turn).toBe("X");
    game.makeMove({ row: 0, column: 0, player: "X" });
    expect(() => {
      // Should not be able to go in a taken space.
      game.makeMove({ row: 0, column: 0, player: "O" });
    }).toThrow();
    expect(game.getWinner()).toBe(null);
    expect(game.turn).toBe("O");
    game.makeMove({ row: 1, column: 0, player: "O" });
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 2, column: 2, player: "X" });
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 0, column: 2, player: "O" });
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 1, column: 1, player: "X" });
    expect(game.getWinner()).toBe("X");
  });

  it("Should handle cat's game", () => {
    const game = new Game();
    expect(game.anyMovesLeft()).toBe(true);
    game.makeMove({ row: 0, column: 0, player: "X" });
    expect(game.anyMovesLeft()).toBe(true);
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 0, column: 1, player: "O" });
    expect(game.anyMovesLeft()).toBe(true);
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 1, column: 1, player: "X" });
    expect(game.anyMovesLeft()).toBe(true);
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 2, column: 2, player: "O" });
    expect(game.anyMovesLeft()).toBe(true);
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 0, column: 2, player: "X" });
    expect(game.anyMovesLeft()).toBe(true);
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 1, column: 0, player: "O" });
    expect(game.anyMovesLeft()).toBe(true);
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 2, column: 1, player: "X" });
    expect(game.anyMovesLeft()).toBe(true);
    expect(game.getWinner()).toBe(null);
    game.makeMove({ row: 2, column: 0, player: "O" });
    expect(game.anyMovesLeft()).toBe(true);
    expect(game.getWinner()).toBe(null);
    expect(game.anyMovesLeft()).toBe(true);
    game.makeMove({ row: 1, column: 2, player: "X" });
    expect(game.getWinner()).toBe(null);
    expect(game.anyMovesLeft()).toBe(false);
  });
});

describe("Parse user input", () => {
  it("Should handle positive input", () => {
    const game = new Game();
    expect(Ui.parseMove(game, "0 1")).toStrictEqual({
      row: 0,
      column: 1,
      player: "X",
    });
    expect(Ui.parseMove(game, "1 2")).toStrictEqual({
      row: 1,
      column: 2,
      player: "X",
    });
  });

  it("Should report out of bounds", () => {
    const game = new Game();
    expect(() => {
      Ui.parseMove(game, "-1 1");
    }).toThrow();
    expect(() => {
      Ui.parseMove(game, "3 1");
    }).toThrow();
  });

  it("Should report nonnumeric", () => {
    const game = new Game();
    expect(() => {
      Ui.parseMove(game, "e 1");
    }).toThrow();
  });

  it("Should report wrong number of args", () => {
    const game = new Game();
    expect(() => {
      Ui.parseMove(game, "1");
    }).toThrow();
  });
});
