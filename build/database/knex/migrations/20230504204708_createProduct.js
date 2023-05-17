"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
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
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable("products");
}
exports.down = down;
