import Entity from "./base/Entity";
import connection from "../../db";

class Tag extends Entity {
  id: number;
  name: string;

  constructor() {
    super("tags");
  }
}

export default new Tag();
