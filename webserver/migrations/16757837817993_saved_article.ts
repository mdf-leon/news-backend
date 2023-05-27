import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("saved_articles", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("users.id");
    table.integer("article_id").notNullable().references("articles.id");
    table.string("folder").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("saved_articles");
}
