import request from "supertest";

import { App } from "../index";
import User from "../entities/User";

describe("User router", () => {
  let app: App;

  beforeAll(async () => {
    app = new App();
    await app.executeApp();
  });

  afterAll(async () => {
    await app.closeApp();
    // Remove all the users created during the tests
    // await User.deleteMany({});
  });

  afterEach(async () => {
    const users = [{ email: "newuser@b.c" }, { email: "existinguser@b.c" }];
    for (const user of users) {
      const foundUser = await User.findBy("email", user.email);
      if (foundUser) {
        await User.delete(foundUser.id);
      }
    }
  });

  describe("POST /api/user/register", () => {
    it("should register a new user", async () => {
      const response = await request(app.getAppServer())
        .post("/api/user/register")
        .send({
          username: "newuser",
          email: "newuser@b.c",
          password: "secret",
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty("username", "newuser");
    });
  });

  describe("POST /api/user/login", () => {
    it("should log in a registered user", async () => {
      const user = {
        username: "existinguser",
        email: "existinguser@b.c",
        password: "secret",
      };
      
      await User.create(user);
      
      const response = await request(app.getAppServer())
        .post("/api/user/login")
        .send(user);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
    });

    it("should not log in an unregistered user", async () => {
      const response = await request(app.getAppServer())
        .post("/api/user/login")
        .send({
          username: "nonexistentuser",
          email: "nonexistentuser@b.c",
          password: "secret",
        });
      expect(response.status).toBe(401);
    });
  });
});
