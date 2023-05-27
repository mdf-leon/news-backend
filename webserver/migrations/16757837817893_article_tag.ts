import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("article_tag", (table) => {
    table.increments("id").primary();
    table.integer("article_id").notNullable().references("articles.id");
    table.integer("tag_id").notNullable().references("tags.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("article_tag");
}
