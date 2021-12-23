const PG = require("../utils/knex.js")

const Database = {
    async initialiseTables() {
        try {
            /**
             * Create table achievemenTable
             * @param: none
             * @returns: created table achievements
             */
            await PG.schema.hasTable('achievementTable').then(async (exists) => {
                if (!exists) {
                    await PG.schema
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
            await PG.schema.hasTable('genreTable').then(async (exists) => {
                if (!exists) {
                    await PG.schema
                        .createTable('genreTable', (table) => {
                            table.increments();
                            table.uuid('uuid');
                            table.string('genreName');
                            table.timestamps(true, true);
                        })
                        .then(() => PG('achievementTable').select('achievementTable.uuid', 'achievementTable.genreName'))
                        .then((rows) => PG('genreTable').insert(rows))
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

module.exports = Database, PG;