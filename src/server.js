import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from './config/viewEngine';

// Init app
const app = express();

// Connect to MongoDB;
ConnectDB();

// Config view engine
configViewEngine(app);

const hostname = "localhost";
const port = 8080;

app.get("/", (req, res) => {
  return res.render("main/master");
});

app.get("/login-register", (req, res) => {
  return res.render("auth/loginRegister");
});

app.listen(port, hostname, () => {
  console.log(`Server is running at => ${hostname}:${port}`);
});
