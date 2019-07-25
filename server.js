import express from 'express';
const app = express();
const hostname= "localhost";
const port= 8080;

app.get("/",(req,res) => {
    res.send("<h1>What's up !</h1>");
});

app.get("/contact",(req,res) => {
    res.send("<p>Contact here</p>");
});

app.get('/about',(req,res) => {
    res.send("<p>What about me ?</p>")
});

app.listen(port,hostname,() => {
    console.log(`Server is running at => ${hostname}:${port}`);
});
