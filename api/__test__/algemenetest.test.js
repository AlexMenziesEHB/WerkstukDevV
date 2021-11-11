const request = require("supertest");

const app = require("../src/index");

let elementId;


describe("GET / ", () => {
    test("It should respond with an array of achievements", async () => {
        const response = await request(app).get("/");
        expect(response.body.data).toEqual([{
                "description": "Succesfully signed up",
                "id": 1,
                "name": "Welcome",
                "points": "200",
            },
            {
                "description": "Succesfully tried your first workout",
                "id": 2,
                "name": "First try",
                "points": "350",
            },
            {
                "description": "Let a friend join you with your journey",
                "id": 3,
                "name": "Refer a friend",
                "points": "100",
            },
        ]);
        expect(response.statusCode).toBe(200);
    });
});


describe("Test to get the data in the database", () => {
    test("GET /", (done) => {
        request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].name = "test achievement";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});

describe("Test to insert data into the database.", () => {
    test("POST /send", (done) => {
        request(app)
            .post("/send")
            .expect("Content-Type", /json/)
            .send({
                name: "new achievement",
            })
            .expect(201)
            .expect((res) => {
                res.body.data.length = 2;
                res.body.data[0].name = "test achievement";
                res.body.data[1].name = "new achievement";
            })
            .end((err, res) => {
                if (err) return done(err);
                elementId = res.body.data[1].id;
                return done();
            });
    });
});

describe("Test to update an element that was inserted in the database", () => {
    test("PUT /update/:id", (done) => {
        request(app)
            .put(`/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                name: "updated achievement",
            })
            .expect(200)
            .expect((res) => {
                res.body.data.length = 2;
                res.body.data[0].name = "test achievement";
                res.body.data[1].id = elementId;
                res.body.data[1].name = "updated achievement";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});

describe("Test to delete an element that was inserted in the database", () => {
    test("DELETE /destroy/:id", (done) => {
        request(app)
            .delete(`/destroy/${elementId}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].name = "test achievement";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});