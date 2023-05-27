import Webserver from "./Webserver";
import dotenv from "dotenv";

dotenv.config();


export function start() {
  const app = new Webserver()
  app.executeApp()
  return app
}

export async function shutdown(app: Webserver) {
  await app.shutdownWebserver()
  return app
} 