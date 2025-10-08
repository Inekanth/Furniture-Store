const express = require ("express");
const app = express();
require ("dotenv").config();
require ("./conn/conn")
const User = require ("./routes/user");

app.use ("/api/v1", User);

app.get ("/", (req, res)=>{
    res.send("Hello I'm ready ")
})


app.listen (process.env.PORT, ()=>{
    console.log("Server is started");
})