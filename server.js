const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const fetch = require("node-fetch");
const fs = require("fs");

const DIST_DIR = path.join(__dirname, "./client/dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static(DIST_DIR));
// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
// app.use("/api/auth", require("./server/api/auth"));

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static(DIST_DIR));

  app.get("*", (req, res) => {
    res.sendFile(HTML_FILE);
  });
}

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("App listening on port: " + port);
  }
});
