const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
var knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const port = 5000;

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "agent47",
    database: "smart-brain-database",
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

//--> res = this is working
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//signin --> POST = success/fail
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

//register --> POST = user
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//profile/:userid --> GET = user
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

//image --> PUT = user
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {image.handleApiCall(req, res, db)});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
/*
    /--> res = this is working
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userid --> GET = user
    /image --> PUT = user
*/
