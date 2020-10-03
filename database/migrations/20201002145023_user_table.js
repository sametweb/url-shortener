exports.up = function (knex) {
  return knex.schema.createTable("user", (tbl) => {
    tbl.increments();
    tbl.string("email").unique().index().notNullable();
    tbl.string("secret_key").unique().index().notNullable();
    tbl.timestamp("signup_date").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
