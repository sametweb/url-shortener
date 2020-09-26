const { table } = require("../db-config");

exports.up = function (knex) {
  return knex.schema.createTable("url", (tbl) => {
    tbl.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("url").notNullable().unique().index();
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("url");
};
