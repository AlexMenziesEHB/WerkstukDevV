const PG = require("knex")({
    client: "pg",
    version: "9.6",
    searchPath: ["knex", "public"],
    connection: process.env.PG_CONNECTION_STRING ?
        process.env.PG_CONNECTION_STRING : "postgres://example:example@localhost:5432/test",
});

module.exports = PG;