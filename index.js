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
    res.redirect(cache[id].url);
  } else {
    try {
      let result = await Url.getUrl(id);
      cache[id] = result;
      res.redirect(result.url);
    } catch {
      res.redirect("http://localhost:3000/not-found");
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
