const express = require("express");
const server = express();

const cors = require("cors");
const helmet = require("helmet");

const Url = require("./database/url-model");

server.use(express.json());
server.use(cors());
server.use(helmet());

const cache = {};

server.get("/", (req, res) => {
  res.send("URL Shortener");
});

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
      res.redirect(`${process.env.FRONT_END}/not-found`);
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

server.get(
  "/.well-known/acme-challenge/8-B-AJpG4DOxRbb1PbOAB7kmlAGydC6o1vlPnNGPzUk",
  (req, res) => {
    res.send(
      "8-B-AJpG4DOxRbb1PbOAB7kmlAGydC6o1vlPnNGPzUk.Wz3C7IFAfMOY58c3qdkr3FQNtww-Hl23OduJFBWwtgo"
    );
  }
);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("server is working on 4000");
});
