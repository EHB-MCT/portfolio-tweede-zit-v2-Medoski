const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

const pg = require("../utils/pg");

const Game = require("../classes/Game");

app.use(morgan("common"));
app.use(express.json());

/**
 * Gets all the games from the API
 * @returns return array - objects that contain : userId , gameName , gameImg , gameDescription, gameCompletion, gameDeveloper , gameGenre
 */
app.get("/", async (req, res) => {
  try {
    await pg
      .select()
      .from("games")
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    res.status(500).send({
      error: "something went wrong",
      value: error.stack,
    });
  }
});

/**
 * Gets a specific game from the api
 * @returns return object - object that contain : userId , gameName , gameImg , gameDescription, gameCompletion, gameDeveloper , gameGenre
 */
app.get("/:id", async (req, res) => {
  try {
    const ID = parseInt(req.params.id);

    if (isNaN(ID)) throw new Error("ID is not valid");

    const query = await pg("games").where({ id: ID });
    const findGame = query[0];

    if (!findGame) throw new Error("Game does not exist");

    await pg
      .select()
      .from("games")
      .where({ id: ID })
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    res.status(500).send({
      error: "something went wrong",
      value: error.stack,
    });
  }
});

/**
 * template returnObject:
 *  userId:  Int - ID of the user
 *  gameName: String - Name of the game
 *  GameImg: String - Cover of the game
 *  GameDescription : String - Description of the game
 *  gameCompletion : String - Completion of the game
 *  gameDeveloper : String - Developer of the game
 *  gameGenre : String - Genre of the game
 *
 * @api {post} /game Add a game to the database
 * @param {Int} userId ID of the user
 * @param {String} gameName Name of the game
 * @param {String} gameImg Cover of the game
 * @param {String} gameDescription Description of the game
 * @param {String} gameCompletion Completion of the game
 * @param {String} gameDeveloper Developer of the game
 * @param {String} gameGenre Genre of the game
 * @returns return object - The game that was added
 */
app.post("/", async (req, res) => {
  try {
    if (
      !req.body.userId ||
      !req.body.gameName ||
      !req.body.gameImg ||
      !req.body.gameDescription ||
      !req.body.gameGenre ||
      !req.body.gameCompletion ||
      !req.body.gameDeveloper
    ) {
      throw new Error("A field was not filled in");
    }
    let game = new Game(
      req.body.userId,
      req.body.gameName,
      req.body.gameImg,
      req.body.gameDescription,
      req.body.gameGenre,
      req.body.gameCompletion,
      req.body.gameDeveloper
    );

    await pg("games").insert(game);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong",
      value: error.stack,
    });
  }
});

/**
 * Gets all the games from a user
 * @returns return array - objects that contain : userId , gameName , gameImg , gameDescription, gameCompletion, gameDeveloper , gameGenre
 */
app.get("/saved/:id", async (req, res) => {
  try {
    await pg
      .select()
      .from("games")
      .where({ userId: req.params.id })
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    res.status(500).send({
      error: "something went wrong",
      value: error.stack,
    });
  }
});

/**

 * @api {delete} /user/:id Delete a saved game
 * @param {Class} _id Id of the object
 * 
 * @returns return object - The game that was deleted
 */
app.delete("/:id", async (req, res) => {
  try {
    const ID = parseInt(req.params.id);

    if (isNaN(ID)) throw new Error("ID is not valid");

    const query = await pg("games").where({ id: ID });
    const findGame = query[0];

    if (!findGame) throw new Error("Game does not exist");

    await pg("games")
      .where({ id: ID })
      .del()
      .then(() => {
        res.sendStatus(200);
      });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong",
      value: error.stack,
    });
  }
});

async function initialiseTableGames() {
  await pg.schema.hasTable("games").then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable("games", (table) => {
          table.increments();
          table.integer("userId");
          table.string("gameName");
          table.string("gameImg");
          table.text("gameDescription");
          table.string("gameGenre");
          table.string("gameCompletion");
          table.string("gameDeveloper");
        })
        .then(async () => {
          console.log("Table games has been created");
        });
    } else {
      console.log("Table games already exists");
    }
  });
}

initialiseTableGames();

module.exports = app;
