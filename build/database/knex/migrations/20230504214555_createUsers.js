"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const bcrypt_1 = require("bcrypt");
async function up(knex) {
    const exists = await knex.schema.hasTable("users");
    const adminPass = await (0, bcrypt_1.hash)("123", 8);
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
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable("users");
}
exports.down = down;
