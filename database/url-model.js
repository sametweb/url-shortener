const db = require("./db-config");

module.exports = {
  getUrl,
  setUrl,
};

function getUrl(id) {
  return db("url").where({ id }).first();
}

function setUrl(url) {
  console.log(url);
  return db("url")
    .insert({ url }, "id")
    .then(([id]) => {
      console.log(id);

      return db("url").where({ id }).first();
    });
}
