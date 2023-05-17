import type { Knex } from "knex";
import { resolve } from "path";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: resolve(__dirname, "database", "database.db"),
    },
    pool: {
      afterCreate: (conn: any, cb: any) =>
        conn.run("PRAGMA foreign_keys = ON", cb),
    },
    migrations: {
      directory: resolve(__dirname, "database", "knex", "migrations"),
      loadExtensions: [".js"],
    },
    useNullAsDefault: true,
  },
};

module.exports = config;
