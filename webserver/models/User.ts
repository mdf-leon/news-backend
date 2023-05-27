import Entity from "./base/Entity";
import bcrypt from "bcrypt";
import connection from "../../db";
import Article from "./Article";

class User extends Entity {
  id: number;
  username: string;
  email: string;
  password: string;

  constructor() {
    super("users");
  }

  async create(data: any) {
    const tempData = { ...data };
    tempData.password = await bcrypt.hash(tempData.password, 10);
    return super.create(tempData);
  }

  async subscribeToTag(userId: number, tagId: number) {
    try {
      await connection("subscribed_tags").insert({ user_id: userId, tag_id: tagId });
    } catch (error) {
      throw new Error("Error subscribing to the tag");
    }
  }

  async getNewsFromSubscribedTags(userId: number) {
    try {
      const news = await connection("articles")
        .join("article_tag", "articles.id", "=", "article_tag.article_id")
        .join("subscribed_tags", "article_tag.tag_id", "=", "subscribed_tags.tag_id")
        .where("subscribed_tags.user_id", userId)
        .select("articles.*");

      return news;
    } catch (error) {
      throw new Error("Error retrieving news from subscribed tags");
    }
  }

  async saveArticle(userId: number, articleId: number, folder: string) {
    try {
      await connection("saved_articles").insert({ user_id: userId, article_id: articleId, folder });
    } catch (error) {
      throw new Error("Error saving the article");
    }
  }
}

export default new User();
