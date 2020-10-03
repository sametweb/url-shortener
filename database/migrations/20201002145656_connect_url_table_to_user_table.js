exports.up = function (knex) {
  return knex.schema.alterTable("url", (tbl) => {
    tbl.integer("user_id").unsigned();
    tbl.foreign("user_id").references("user.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table("url", (tbl) => {
    tbl.dropForeign("user_id");
    tbl.dropColumn("user_id");
  });
};
