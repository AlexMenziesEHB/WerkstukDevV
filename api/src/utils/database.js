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
        // Starting promise chain with Promise.resolve() for readability only
        /*exports.up = function (knex, Promise) {
            return Promise.resolve()
                .then(() => knex.schema.createTable('table_b', t => {
                    t.string('col_a')
                    t.string('col_b')
                }))
                .then(() => knex.schema.createTable('table_c', t => {
                    t.string('col_c')
                    t.string('col_d')
                }))
                .then(() => knex('table_a').select('col_a', 'col_b'))
                .then((rows) => knex('table_b').insert(rows))
                .then(() => knex('table_a').select('col_c', 'col_d'))
                .then((rows) => knex('table_c').insert(rows))
                .then(() => knex.schema.dropTableIfExists('table_a'))
        };

        exports.down = function (knex, Promise) {
            return Promise.resolve()
                .then(() => knex.schema.createTable('table_a', table => {
                    table.increments();
                    table.uuid('uuid');
                    table.string('achievementName');
                    table.string('description');
                    table.string('genreName');
                    table.timestamps(true, true);
                }))
                .then(() => knex('table_b').select('uuid', 'genreName'))
                .then((rows) => knex('table_a').insert(rows))
                .then(() => knex.schema.dropTableIfExists('table_b'))
                .then(() => knex.schema.dropTableIfExists('table_c'))
        };
        */
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
                    })
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
                    .then(() => pg('achievementTable').select('achievementTable.uuid', 'achievementTable.genreName'))
                    .then((rows) => pg('genreTable').insert(rows))
                /*.then(async () => {
                    console.log('created a genre table');
                });*/
            }
        });

    }
}

module.exports = Database, pg;