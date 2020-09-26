const express = require("express");
const server = express();
const cors = require("cors");
const shortid = require("shortid");
const Url = require("./database/url-model");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("URL Shortener");
});

const cache = {};

server.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (cache[id] !== undefined) {
    res.status(200).json(cache[id]);
  } else {
    try {
      let result = await Url.getUrl(id);
      cache[id] = result;
      res.status(200).json(result);
    } catch {
      res.status(404).json({ error: "URL does not exist" });
    }
  }
});

server.listen(4000, () => {
  console.log("server is working on 4000");
});
