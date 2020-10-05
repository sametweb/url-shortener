require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");
const decodeIdToken = require("./middleware/decodeIdToken");

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(decodeIdToken);

const Url = require("./database/url-model");

const cache = {};

server.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

server.post("/login", (req, res) => {});

server.get("/", async (req, res) => {
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
  const { user_id } = req;
  const { url } = req.body;

  if (!url) {
    res
      .status(400)
      .json({
        message: "You must provide a url parameter in the request body.",
      })
      .end();
  } else {
    try {
      let result = await Url.checkUrl(url, user_id);
      cache[result.id] = result;
      res.status(200).json(result);
    } catch {
      let result = await Url.setUrl(url, user_id);
      cache[result.id] = result;
      res.status(201).json(result);
    }
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
