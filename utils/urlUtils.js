const crypto = require("crypto-js");
const uuid = require("uuid");

function createHash(url) {
  const hash = crypto.HmacSHA512(url + process.env.SALT, uuid.v4()).toString();
  return hash.substring(0, 6);
}

function createUrlObject(url) {
  const urlObject = { url };
  const hash = createHash(url);
  urlObject.hash = hash;
  return urlObject;
}

async function checkHashExists(client, hash) {
  const urls = await client.db("omiturl").collection("urls");
  return (await urls.find({ hash }).length) > 0;
}

module.exports = { createUrlObject, checkHashExists };
