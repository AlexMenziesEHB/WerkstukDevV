const pg = require("knex")({
    client: "pg",
    version: "9.6",
    searchPath: ["knex", "public"],
    connection: process.env.PG_CONNECTION_STRING ?
        process.env.PG_CONNECTION_STRING : "postgres://example:example@localhost:5432/test",
});

const Database = {
    async initialiseTables() {
        try {
            /**
             * Create table achievemenTable
             * @param: none
             * @returns: created table achievements
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
            /**
             * Create table genreTable
             * @param: none
             * @returns: created table genres
             */
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
        } catch (err) {
            console.log(err);
            // process.exit(1);
        }
    }
}

module.exports = Database, pg;