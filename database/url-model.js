const db = require("./db-config");
const shortid = require("shortid");

module.exports = {
  getUrl,
  setUrl,
  checkUrl,
};

function getUrl(id) {
  return db("url").where({ id }).first();
}

function setUrl(url, user_id) {
  const id = shortid.generate();

  return db("url")
    .insert({ id, url, user_id }, "id")
    .then(([id]) => {
      return db("url").where({ id }).first();
    });
}

function checkUrl(url, user_id) {
  return db("url").where({ url, user_id }).first();
}
