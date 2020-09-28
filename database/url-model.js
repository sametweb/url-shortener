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

function setUrl(url) {
  const id = shortid.generate();

  return db("url")
    .insert({ id, url }, "id")
    .then(([id]) => {
      return db("url").where({ id }).first();
    });
}

function checkUrl(url) {
  return db("url").where({ url }).first();
}
