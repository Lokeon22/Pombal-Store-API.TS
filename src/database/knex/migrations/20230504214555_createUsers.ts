import { Knex } from "knex";
import { hash } from "bcrypt";

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable("users");
  const adminPass = await hash("123", 8);
  if (!exists) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.text("name");
      table.text("email");
      table.text("password");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.boolean("is_admin").notNullable().defaultTo(0);
    });
  }

  return await knex("users").insert({
    name: "admin",
    email: "admin@admin.com",
    password: adminPass,
    is_admin: true,
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("users");
}
