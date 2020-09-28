exports.up = function (knex) {
  return knex.schema.createTable("url", (tbl) => {
    tbl.string("id").notNullable().unique().index();
    tbl.string("url").notNullable().unique().index();
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("url");
};
