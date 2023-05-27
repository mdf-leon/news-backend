import express from "express";
import { Server } from "node:http";
import { Application } from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";

import User from "./models/User";

import connection from "../db";

declare module 'express-session' {
  interface SessionData {
    token?: string;
    user?: typeof User;
  }
}

export default class Webserver {
  private app: Application;
  private server: Server;

  constructor() {
    this.app = express();
    this.app.use(cors({
      // origin: '*',
      origin: 'http://localhost:3000',
      credentials: true,            // access-control-allow-credentials:true 
    }));
    this.app.use(bodyParser.json());
    this.app.use(
      session({
        secret: process.env.JWT_SECRET!, // Secret key for signing the session ID cookie
        resave: false, // Don't resave the session if it wasn't modified
        saveUninitialized: false, // Don't save uninitialized sessions
        cookie: {
          secure: process.env.NODE_ENV === "production", // Only set the cookie over HTTPS in production
          // secure: true,  
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 day cookie lifetime
        }
      })
    );
    this.configureRoutes(); 
  }

  private configureRoutes() {
    const routesFolder = path.join(__dirname, "routes");
    fs.readdirSync(routesFolder).forEach((file) => {
      const router = require(path.join(routesFolder, file)).default;
      const baseRoute = file.replace("Router.ts", "");
      this.app.use(`/api/${baseRoute}`, router);
    });
  }

  public async shutdownWebserver() {
    // TODO: persistent smart logging
    await connection.destroy(); 
    return this.server.close() 
  }

  public getAppServer() {
    return { app: this.app, server: this.server };
  }

  public async executeApp() {
    if (process.env.NODE_ENV !== "test") {
      this.server = this.app.listen(process.env.APP_PORT || 3333);
      console.log("server on");
    } else {
      this.server = await this.app.listen(0);
    }
  }
}
