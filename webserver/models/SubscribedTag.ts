import Entity from "./base/Entity";
import connection from "../../db";

class SubscribedTag extends Entity {
  id: number;
  user_id: number;
  tag_id: number;
  created_at: Date;

  constructor() {
    super("subscribed_tags");
  }
}

export default new SubscribedTag();
