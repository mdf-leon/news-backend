import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("articles", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable(); 
    table.string("description").notNullable();
    table.string("body").notNullable();
    table.string("author").notNullable(); 
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("articles");
}
