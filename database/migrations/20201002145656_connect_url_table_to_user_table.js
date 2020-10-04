exports.up = function (knex) {
  return knex.schema.alterTable("url", (tbl) => {
    tbl.string("user_id").index();
  });
};

exports.down = function (knex) {
  return knex.schema.table("url", (tbl) => {
    tbl.dropColumn("user_id");
  });
};
