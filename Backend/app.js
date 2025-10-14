const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");

const user = require("./routes/user");
const item = require("./models/item");
const Item = require("./routes/item");
const favourite = require("./routes/favorite");

app.use(express.json()); //parses incoming JSON requests

// Routes
app.use("/api/v1", user);
app.use("/api/v1", Item);
app.use("/api/v1", favourite);

app.get("/", (req, res) => {
  res.send("Hello, I'm ready!");
});

app.listen(process.env.PORT, () => {
  console.log("Server is started");
});
