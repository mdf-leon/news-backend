import Entity from "./base/Entity";
import connection from "../../db";

class ArticleTag extends Entity {
  id: number;
  article_id: number;
  tag_id: number;
  created_at: Date;

  constructor() {
    super("article_tag");
  }
}

export default new ArticleTag();
