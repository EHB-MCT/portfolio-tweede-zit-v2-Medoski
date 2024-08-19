const pg = require("knex")({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING
    ? process.env.PG_CONNECTION_STRING
    : "postgres://admin:admin@gamelibraryDB:5432/gamelibrary_api",
  searchPath: ["knex", "public"],
  port: 5432,
});

module.exports = pg;
