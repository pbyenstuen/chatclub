const request = require("supertest");
const app = require("../src/server/server")
const users = require("../src/server/db/users")

afterEach(() => {
    users.clearUsers();
});

const credentials = {
    username: "realDonaldTrump",
    password: "yourefired"
}

describe("auth API", () => {
    it("can create new local user", async () => {
        await request(app)
            .post("/api/auth/signup")
            .send(credentials)
            .expect(201);
    });

    it("rejects creating the same user twice", async () => {
        await request(app)
            .post("/api/auth/signup")
            .send(credentials)
            .expect(201)

        await request(app)
            .post("/api/auth/signup")
            .send(credentials)
            .expect(400);
    });

    it("can log in user", async () => {
        const user = request.agent(app);

        await user
            .post("/api/auth/signup")
            .send(credentials)
            .expect(201)

        await user
            .post("/api/auth/login")
            .send(credentials)
            .expect(200);
    });

    it("can log out user", async () => {
        await request(app)
            .post("/api/auth/signup")
            .send(credentials)
            .expect(201);

        await request(app)
            .post("/api/auth/login")
            .send(credentials)
            .expect(200)

        await request(app)
            .post("/api/auth/logout")
            .expect(204);
    });

    it("returns 401 on fetching non-existent user", async () => {
        await request(app)
            .get("/api/auth/user")
            .expect(401);
    });

    it("can return user info", async () => {
        const user = request.agent(app);

        await user
            .post("/api/auth/signup")
            .send(credentials)
            .expect(201);

        await user
            .post("/api/auth/login")
            .send(credentials)
            .expect(200);

        await user
            .get("/api/auth/user")
            .then((response) => {
                expect(response.body).toMatchObject({
                    username: "realDonaldTrump",
                    displayName: "realDonaldTrump"
                });
            });
    });
});