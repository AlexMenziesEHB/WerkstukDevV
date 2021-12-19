const pg = require("knex")({
    client: "pg",
    version: "9.6",
    searchPath: ["knex", "public"],
    connection: process.env.PG_CONNECTION_STRING ?
        process.env.PG_CONNECTION_STRING : "postgres://example:example@localhost:5432/test",
});


const SEED = {
    async initialiseData() {
        try {
            await pg.table('achievementTable').delete()
            await pg.table('genreTable').delete()

            await pg.table('achievementTable').insert([{
                id: 1,
                uuid: "d07d0d20-59e2-11ec-84da-69067e8d8904",
                achievementName: "Welcome!",
                description: "Welcome to the club!",
                genreName: "Start",
            }, {
                id: 2,
                uuid: "d07d0d20-59e2-11ec-84da-69067e8d8924",
                achievementName: "Firts start!",
                description: "Completed first workout",
                genreName: "Start",
            }]);
            await pg.table('genreTable').insert([{
                id: 1,
                uuid: "d07d0d20-59e2-11ec-84da-69067e8d8904",
                genreName: "Start",
            }, {
                id: 2,
                uuid: "d07d0d20-59e2-11ec-84da-69067e8d8924",
                genreName: "Start",
            }]);

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = SEED;