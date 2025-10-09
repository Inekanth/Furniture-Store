const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");

const user = require("./routes/user");

// ✅ Important middlewares
app.use(express.json()); //parses incoming JSON requests
//app.use(express.urlencoded({ extended: true })); optional, for form data

// Routes
app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.send("Hello, I'm ready!");
});

app.listen(process.env.PORT, () => {
  console.log("Server is started");
});
