import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.text("name");
    table.text("description");
    table.text("image").defaultTo(null);
    table.decimal("price", 10, 2);
    table.integer("stock_amount");
    table.text("category");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("products");
}
