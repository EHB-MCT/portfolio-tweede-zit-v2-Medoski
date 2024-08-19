// Made a class Game
class Game {
  constructor(
    userId,
    gameName,
    gameImg,
    gameDescription,
    gameGenre,
    gameCompletion,
    gameDeveloper
  ) {
    this.userId = userId;
    this.gameName = gameName;
    this.gameImg = gameImg;
    this.gameDescription = gameDescription;
    this.gameGenre = gameGenre;
    this.gameCompletion = gameCompletion;
    this.gameDeveloper = gameDeveloper;
  }
}

module.exports = Game;
