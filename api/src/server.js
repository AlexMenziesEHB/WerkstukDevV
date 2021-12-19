const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const Database = require("./utils/database.js");
const Helpers = require('./utils/helpers.js')

const pg = require('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
})

const app = express()
http.Server(app)


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

/**
 * GET /test
 * @param: none
 * @returns: Testendpoint
 */
app.get("/test", (req, res) => {
    //res.status(200).send();
    res.send("hello world")
})

/*=================== Achievements Endpoints =====================*/
/**
 * GET /achievements
 * @param: none
 * @returns: Get all achievements from database
 */
app.get("/achievements", async (req, res) => {
    const result = await pg
        .select(["uuid", "achievementName", "description", "genreName", "created_at"])
        .from("achievementTable")
    res.status(200).send(result);
})

/**
 * POST /achievement
 * @param: {uuid, achievementName, description, genreName}
 * @returns: Returns uuid of the added achievement
 */
app.post("/achievement", (req, res) => {
    let uuid = Helpers.generateUUID();
    let expectedParams = {
        uuid: 'string',
        achievementName: 'string',
        description: 'string',
        genreName: 'string',
    }
    if (Helpers.checkParameters(expectedParams, {
            uuid: uuid,
            achievementName: req.body.achievementName,
            description: req.body.description,
            genreName: req.body.genreName,
            created_at: new Date()
        }, true)) {
        pg.insert({
                uuid: uuid,
                achievementName: req.body.achievementName,
                description: req.body.description,
                genreName: req.body.genreName,
                created_at: new Date(),
            })
            .into("achievementTable")
            .then(() => {
                res.json({
                    uuid: uuid
                })
            })
    } else {
        res.status(400).send("Not the correct parameters");
    }
})

/**
 * GET /achievement/uuid
 * @param: uuid
 * @returns: Get One achievement from database by uuid
 */
app.get('/achievement/:uuid', async (req, res) => {
    const result = await pg
        .select(["uuid", "achievementName", "description", "genreName", "created_at"])
        .from('achievementTable')
        .where({
            uuid: req.params.uuid
        })
    res.json({
        res: result
    })
})

/**
 * PATCH /achievement/:uuid
 * @param: Send object with the properties that need to be updated
 * @returns: Returns status code 200
 */
app.patch("/achievement/:uuid", (req, res) => {
    pg('achievementTable')
        .where({
            uuid: req.params.uuid
        })
        .update(req.body)
        .then(() => {
            res.sendStatus(200)
        })
})

/**
 * DELETE /achievement
 * @param: {uuid}
 * @returns: status code 200
 */
app.delete("/achievement", (req, res) => {
    if (Helpers.checkParameters({
            uuid: 'string'
        }, {
            uuid: req.body.uuid
        }, false)) {
        pg('achievementTable')
            .where({
                uuid: req.body.uuid
            })
            .del()
            .then(() => {
                res.sendStatus(200);
            })
    } else {
        res.status(400).send("Invalid parameters");
    }
})

/*=================== Genre Endpoints =====================*/

/**
 * GET /genres
 * @param: none
 * @returns: Get all genres from database
 */
app.get('/genres', async (req, res) => {
    const result = await pg
        .select(['uuid', 'genreName', 'created_at'])
        .from('genreTable')
    res.status(200).send(result);
})

/**
 * GET /genre/uuid
 * @param: uuid
 * @returns: Get One genre from database by uuid
 */
app.get("/genre/:uuid", async (req, res) => {
    if (Helpers.checkParameters({
            uuid: 'string'
        }, {
            uuid: req.params.uuid
        }, false)) {
        const result = await pg
            .select(["uuid", "genreName", "created_at"])
            .from("genreTable")
            .where({
                uuid: req.params.uuid
            });
        if (result.length == 0) {
            res.status(404).send("genre not found");
        } else {
            res.status(200).send(result[0]);
        }
    } else {
        res.status(400).send("Invalid parameters");
    }
});

/**
 * POST /genre
 * @param: {uuid, genreName, created_at}
 * @returns: Returns uuid of the added genre
 */
app.post("/genre", (req, res) => {
    let uuid = Helpers.generateUUID()
    let expectedParams = {
        uuid: 'string',
        genreName: 'string',
    }
    if (Helpers.checkParameters(expectedParams, {
            uuid: uuid,
            genreName: req.body.genreName,
            created_at: new Date()
        }, true)) {
        pg.insert({
                uuid: uuid,
                genreName: req.body.genreName,
                created_at: new Date(),
            })
            .into("genreTable")
            .then(() => {
                res.json({
                    uuid: uuid
                })
            })
    } else {
        res.status(400).send("Not the correct parameters");
    }

})

/**
 * PATCH /genre/:uuid
 * @param: Send object with the properties that need to be updated
 * @returns: Returns status code 200
 */
app.patch("/genre/:uuid", async (req, res) => {
    pg('genreTable')
        .where({
            uuid: req.params.uuid
        })
        .update(req.body)
        .then(() => {
            res.sendStatus(200)
        })
})

/**
 * DELETE /genre
 * @param: {uuid}
 * @returns: status code 200
 */
app.delete("/genre", (req, res) => {
    pg('genreTable')
        .where({
            uuid: req.body.uuid
        })
        .del()
        .then(() => {
            res.sendStatus(200);
        })
})

Database.initialiseTables();

module.exports = app;