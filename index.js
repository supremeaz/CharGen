const { response } = require("express");
const express = require("express");
const app = express();

const port = 4567;

app.get("/",(req,res) =>{
    res.send("Hey there!");
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})