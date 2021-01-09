const { Game } = require("./index");

test("Game lifecycle should be reasonable", () => {
  const game = new Game();
  expect(game.getWinner()).toBe(null);
  expect(game.turn).toBe('X');
  game.makeMove({ row: 0, column: 0, player: 'X' });
  expect(game.getWinner()).toBe(null);
  game.makeMove({ row: 1, column: 0, player: 'O' });
  expect(game.getWinner()).toBe(null);
  game.makeMove({ row: 2, column: 2, player: 'X' });
  expect(game.getWinner()).toBe(null);
  game.makeMove({ row: 0, column: 2, player: 'O' });
  expect(game.getWinner()).toBe(null);
  game.makeMove({ row: 1, column: 1, player: 'X' });
  expect(game.getWinner()).toBe('X');
});
