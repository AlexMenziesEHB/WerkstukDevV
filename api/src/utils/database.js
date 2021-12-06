const Helpers = require("../utils/helpers.js");

const pg = require("knex")({
    client: "pg",
    version: "9.6",
    searchPath: ["knex", "public"],
    connection: process.env.PG_CONNECTION_STRING ?
        process.env.PG_CONNECTION_STRING : "postgres://example:example@localhost:5432/test",
});

const Database = {
    async initialiseTables() {
        await pg.schema.hasTable('achievementTable').then(async (exists) => {
            if (!exists) {
                await pg.schema
                    .createTable('achievementTable', (table) => {
                        table.increments();
                        table.uuid('uuid');
                        table.string('achievementName');
                        table.string('description');
                        table.string('genreName');
                        table.timestamps(true, true);
                    })
                    .then(async () => {
                        console.log('created achievement table');
                    });
            }
        });
        await pg.schema.hasTable('genreTable').then(async (exists) => {
            if (!exists) {
                await pg.schema
                    .createTable('genreTable', (table) => {
                        table.increments();
                        table.uuid('uuid');
                        table.string('genreName');
                        table.timestamps(true, true);
                    })
                    .then(async () => {
                        console.log('created a genre table');
                        for (let i = 0; i < 10; i++) {
                            const uuid = Helpers.generateUUID();
                            await pg
                                .table('genreTable')
                                .insert({
                                    uuid,
                                    genreName: `Genre No.${i}`
                                })
                        }
                    });
            }
        });
    }
}

module.exports = Database, pg;