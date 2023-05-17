"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config = {
    development: {
        client: "sqlite3",
        connection: {
            filename: (0, path_1.resolve)(__dirname, "database", "database.db"),
        },
        pool: {
            afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
        },
        migrations: {
            directory: (0, path_1.resolve)(__dirname, "database", "knex", "migrations"),
            loadExtensions: [".js"],
        },
        useNullAsDefault: true,
    },
};
module.exports = config;
