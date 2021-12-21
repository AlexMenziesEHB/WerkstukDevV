const supertest = require("supertest")
const app = require("../../src/server")
const request = supertest(app)

let achievementID
let genreID

describe("E2E test", () => {
    it("Post achievement to database and return UUID", async () => {
        try {
            const response = await request.post('/achievement')
                .send({
                    achievementName: "New Achievement Name"
                })
            expect(response.status).toBe(200)
            achievementID = response.body.uuid
            done()
        } catch (error) {}
    })

    it("Get last posted achievement by UUID", async () => {
        try {
            const response = await request.get("/achievement/" + achievementID)
            expect(response.status).toBe(200)
            expect(response.body.res[0].achievementName).toBe("New Achievement Name")
            done()
        } catch (error) {}
    })

    it("Responds with 200 and get all achievements", async () => {
        try {
            const response = await request.get("/achievements")
            expect(response.status).toBe(200)
            expect(typeof response.body).toBe("object")
            done()
        } catch (error) {}
    })

    it("Updates achievement by UUID", async () => {
        try {
            const response = await request.patch("/achievement/" + achievementID)
                .send({
                    achievementName: "Updated Achievement Name"
                })
            expect(response.status).toBe(200)
            done()
        } catch (error) {}
    })

    it("Check updated name of achievement by UUID", async () => {
        try {
            const response = await request.get("/achievement/" + achievementID)
            expect(response.status).toBe(200)
            expect(response.body.res[0].achievementName).toBe("Updated Achievement Name")
            done()
        } catch (error) {}
    })

    it("Return 200 when achievement is deleted", async () => {
        try {
            const response = await request.delete("/achievement").send({
                uuid: achievementID
            })
            expect(response.status).toBe(200)
            done()
        } catch (error) {}
    })

    it("Post genre to database and return UUID", async () => {
        try {
            const response = await request.post('/genre')
                .send({
                    genreName: "Abs"
                })
            expect(response.status).toBe(200)
            genreID = response.body.uuid
            done()
        } catch (error) {}
    })

    it("Responds with 200 and get all genres", async () => {
        try {
            const response = await request.get("/genres")
            expect(response.status).toBe(200)
            expect(typeof response.body).toBe("object")
            done()
        } catch (error) {}
    })

    it("Updates genre by UUID", async () => {
        try {
            const response = await request.patch("/genre/" + genreID)
                .send({
                    genreName: "Arms"
                })
            expect(response.status).toBe(200)
            done()
        } catch (error) {}
    })

    it("Check updated name of genre by UUID", async() => {
        try {
        const response = await request.get("/genre/" + genreID)
        expect(response.status).toBe(200)
        expect(response.body.res[0].genreName).toBe("Arms")
        done()
    } catch (error) {}
    })

    it("Return 200 when genre is deleted", async() => {
        try {
        const response = await request.delete("/genre").send({ uuid: genreID })
        expect(response.status).toBe(200)
        done()
    } catch (error) {}
    })
});
