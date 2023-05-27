import { App } from "../index";
import connection from "../../db";
import mongoose from "mongoose";

describe("App database connection", () => {
  let app: App;

  beforeAll(async () => {
    app = new App();
    await mongoose.connection.readyState; // Wait for MongoDB to be connected
  });

  afterAll(async () => { 
    await app.closeApp(); 
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
