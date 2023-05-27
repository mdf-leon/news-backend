import Entity from "./base/Entity";
import connection from "../../db";

class SavedArticle extends Entity {
  id: number;
  user_id: number;
  article_id: number;
  folder: string;
  created_at: Date;

  constructor() {
    super("saved_articles");
  }
}

export default new SavedArticle();
