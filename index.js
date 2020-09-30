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

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("server is working on 4000");
});

require("greenlock-express")
  .init({
    packageRoot: __dirname,
    configDir: "./greenlock.d",

    // contact for security and critical bug notices
    maintainerEmail: "sametmutevellioglu@gmail.com",

    // whether or not to run at cloudscale
    cluster: false,
  })
  // Serves on 80 and 443
  // Get's SSL certificates magically!
  .serve(server);
