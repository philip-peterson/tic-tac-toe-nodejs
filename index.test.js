const { Game } = require("./index");

test("Game lifecycle should be reasonable", () => {
  const game = new Game();
  expect(game.getWinner()).toBe(null);
});
