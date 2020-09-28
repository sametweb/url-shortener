const express = require("express");
const server = express();
const cors = require("cors");

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

server.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    let result = await Url.checkUrl(url);
    cache[result.id] = result;
    res.status(200).json(result);
  } catch {
    let result = await Url.setUrl(url);
    cache[result.id] = result;
    res.status(201).json(result);
  }
});

server.listen(4000, () => {
  console.log("server is working on 4000");
});
