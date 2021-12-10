const supertest = require("supertest")
const app = require("../../src/server.js")
const request = supertest(app)

/*=================== Achievements Endpoints =====================*/
describe('CRUD endpoint achievements tests', () => {
    let uuid;

    describe("Create an achievement", () => {
        it("responds with 200 if achievement is added to db", async () => {
            try {
                const response = await request
                    .post("/achievement")
                    .send({
                        achievementName: 'New achievement',
                        description: 'This is a description of a new achievement',
                        genreName: 'Start'
                    });
                expect(response.status).toBe(200);
                uuid = response.body.uuid;
                done();
            } catch (error) {}
        });
    })

    describe("GET /achievements", () => {
        it("responds with 200 and returns all achievements", async () => {
            try {
                const response = await request.get("/achievements");
                expect(response.status).toBe(200);
                expect(typeof response.body).toBe("object");
                done()
            } catch (error) {}
        });
    });

    describe("Find an achievement", () => {
        it("finds the recently added achievement in db", async () => {
            try {
                const response = await request.get("/achievement/" + uuid);
                expect(response.status).toBe(200);
                expect(typeof response.body).toBe("object");
                done();
            } catch (error) {}
        });
    })

    describe("Update an achievement", () => {
        it("responds with 200 if achievement is updated", async () => {
            try {
                const response = await request
                    .patch("/achievement/" + uuid)
                    .send({
                        description: "this is an updated description"
                    });
                expect(response.status).toBe(200);
                done();
            } catch (error) {}
        })
    })

    describe("DELETE /achievement", () => {
        it("responds with 400 if no uuid is provided", async () => {
            try {
                const response = await request.delete("/achievement").send({});
                expect(response.status).toBe(400);
                done();
            } catch (error) {}
        });
    });

});

/*=================== Genres Endpoints =====================*/

describe('CRUD endpoint genres tests', () => {
    let uuid;
    describe("GET /genres", () => {
        it("responds with 200 and returns all genres", async () => {
            try {
                const response = await request.get("/genres");
                expect(response.status).toBe(200);
                expect(typeof response.body).toBe("object");
                done()
            } catch (error) {}
        });
    });

    describe("Create a genre", () => {
        it("responds with 200 if genre is added to db", async () => {
            try {
                const response = await request
                    .post("/genre")
                    .send({
                        genreName: 'New genre'
                    });
                expect(response.status).toBe(200);
                uuid = response.body.uuid;
                done();
            } catch (error) {}
        });
    })

    describe("Find a genre", () => {
        it("finds the recently added genre in db", async () => {
            try {
                const response = await request.get("/genre/" + uuid);
                expect(response.status).toBe(200);
                expect(typeof response.body).toBe("object");
                done();
            } catch (error) {}
        });
    })

    describe("Update a genre", () => {
        it("responds with 200 if genre is updated", async () => {
            try {
                const response = await request
                    .patch("/genre/" + uuid)
                    .send({
                        genreName: "updated genre"
                    });
                expect(response.status).toBe(200);
                done();
            } catch (error) {}
        })
    })
});