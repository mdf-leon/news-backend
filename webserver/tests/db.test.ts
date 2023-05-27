import Webserver from "../Webserver";
import connection from "../../db";
import mongoose from "mongoose";

describe("App database connection", () => {
  let app: Webserver;

  beforeAll(async () => {
    app = new Webserver();
    await mongoose.connection.readyState; // Wait for MongoDB to be connected
  });

  afterAll(async () => {
    await app.shutdownWebserver();
  });

  it("should establish a PostgreSQL database connection", async () => {
    try {
      const result = await connection.raw("SELECT 1");
      expect(result.rows.length).toBeGreaterThan(0);
    } finally {
      connection.destroy();
    }
  });

  it("should establish a MongoDB database connection", async () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
