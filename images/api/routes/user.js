const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

const pg = require("../utils/pg");

const User = require("../classes/User");

app.use(morgan("common"));
app.use(express.json());

/**
 * Gets all the users
 * @returns return array - objects that contain : firstName , lastName , email , password
 */
app.get("/", async (req, res) => {
  try {
    await pg
      .select()
      .from("users")
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
 * Gets a specific user
 * @returns return object - object that contain : firstName , lastName , email , password
 */
app.get("/:id", async (req, res) => {
  try {
    await pg
      .select()
      .from("users")
      .where({ id: req.params.id })
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
 * template insertedUser:
 *  firstname: string - firstname of the user
 *  lastname: string - lastname of the user
 *  username: string - username of the user
 *  password: string - password of the user
 *
 * @api {post} /user Add a user
 * @param {String} firstname Firstname of the user
 * @param {String} lastname Lastname of the user
 * @param {String} username Username of the user
 * @param {String} password Password of the user
 * @returns return object - The user that was added
 * */
app.post("/", async (req, res) => {
  try {
    //Add the new user
    let user = await new User(
      req.body.firstname,
      req.body.lastname,
      req.body.email
    );
    await user.hashPassword(req.body.password);

    await pg("users").insert(user);
    res.send(200);
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong",
      value: error.stack,
    });
  }
});

/**
 * template returnObject:
 *  firstname: string - firstname of the user
 *  lastname: string - lastname of the user
 *  username: string - username of the user
 *  password: string - password of the user
 *
 * @api {put} /user/:id Update a user
 * @param {Class} _id Id of the user
 * @param {String} firstname Firstname of the user
 * @param {String} lastname Lastname of the user
 * @param {String} username Username of the user
 * @param {String} email Email of the user
 * @param {String} password Password of the user
 * @returns return object - The user that was updated
 */
app.put("/:id", async (req, res) => {
  try {
    const query = await pg("users").where({ id: req.params.id });
    const findUser = query[0];

    //Add the new user

    let user = await new User(
      req.body.firstname ? req.body.firstname : findUser.firstname,
      req.body.lastname ? req.body.lastname : findUser.lastname,
      req.body.email ? req.body.email : findUser.email,
      req.body.password ? req.body.password : findUser.password
    );

    await user.hashPassword(req.body.password);
    // findUser.save();
    await pg("users").where({ id: req.params.id }).update(user);
    res.send(200);
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong",
      value: error.stack,
    });
  }
});

/**
 * template returnObject:
 *  email: string - email of the user
 *  password: string - password of thr user
 *
 * @api {post} /user/login Checks if user exist
 * @param {String} email Email of the user
 * @param {String} password Password of the user
 * @returns return object - The user that was added
 */
app.post("/login", async (req, res) => {
  try {
    const query = await pg("users").where({ email: req.body.email });
    const findUser = query[0];

    if (findUser == null) return res.status(404).send("No user found");

    const user = new User(
      findUser.firstname,
      findUser.lastname,
      findUser.email,
      findUser.password
    );

    //Unhash the password
    let passwordCheck = await user.unHashPassword(req.body.password);
    if (passwordCheck == false) return res.status(400).send("False password");

    res.status(200).send(findUser);
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong",
      value: error.stack,
    });
  }
});

/**
 * @api {delete} /user/:id Delete a user
 * @param {Class} _id Id of the user
 *
 * @returns return object - The user that was deleted
 */
app.delete("/:id", async (req, res) => {
  try {
    const ID = parseInt(req.params.id);

    if (isNaN(ID)) throw new Error("ID is not valid");

    const query = await pg("users").where({ id: ID });
    const findUser = query[0];

    if (!findUser) throw new Error("User does not exist");

    await pg("users")
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

async function initialiseTableUser() {
  await pg.schema.hasTable("users").then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable("users", (table) => {
          table.increments();
          table.string("firstname");
          table.string("lastname");
          table.string("email");
          table.string("password");
        })
        .then(async () => {
          console.log("Table users has been created");
        });
    } else {
      console.log("Table users already exists");
    }
  });
}

initialiseTableUser();

module.exports = app;
