import Entity from "./base/Entity";
import connection from "../../db";

class Article extends Entity {
  id: number;
  title: string;
  description: string;
  body: string;
  author: string;

  constructor() {
    super("articles");
  }
}

export default new Article();
