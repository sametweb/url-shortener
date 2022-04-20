require("dotenv").config();
const express = require("express");
const { createUrlObject, checkHashExists } = require("./utils/urlUtils");
const { MongoClient } = require("mongodb");

const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASS;
const uri = `mongodb+srv://${user}:${pass}@cluster0.hbui9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());

app.get("/:hash", async (req, res) => {
  const client = app.locals.db;
  const hash = req.params.hash;
  try {
    const url = await client.db("omiturl").collection("urls").findOne({ hash });
    // TODO: Update log values
    if (url) return res.status(200).json(url);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching requested URL", error });
  }
  return res.status(404).json({ message: "Requested URL cannot be found" });
});

app.post("/", async (req, res) => {
  console.log("Post request");
  const client = app.locals.db;
  const url = req.body.url;
  try {
    const urls = await client.db("omiturl").collection("urls");
    let urlObject = createUrlObject(url);
    let hashExists = await checkHashExists(client, urlObject.hash);
    while (hashExists) {
      console.log(hashExists);
      urlObject = createUrlObject(url);
      hashExists = await checkHashExists(client, urlObject.hash);
    }
    const result = await urls.insertOne(urlObject);
    // TODO: Add fields for logging
    const inserted = await urls.findOne({ _id: result.insertedId });
    return res.status(201).json(inserted);
  } catch (error) {
    return res.status(500).json({ message: "Error creating short URL", error });
  }
});

const PORT = process.env.PORT || 3000;

new MongoClient(uri).connect((err, connectedDb) => {
  if (err) throw err;
  app.locals.db = connectedDb;
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
