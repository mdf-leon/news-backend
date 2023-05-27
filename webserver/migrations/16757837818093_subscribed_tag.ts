import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("subscribed_tags", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("users.id");
    table.integer("tag_id").notNullable().references("tags.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("subscribed_tags");
}
