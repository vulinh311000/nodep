var express = require('express');
var app = express();

var hostname= "localhost";
var port= 8080;

app.get("/a",(req,res) => {
    res.send("<h1>What's up !</h1>");
});

app.listen(port,hostname,() => {
    console.log(`Hello Moi nguoi minh la ${hostname}:${port}`);
});