import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';

const hostname = "localhost";
const port = 8080;

// Init app
const app = express();

// Connect to MongoDB;
ConnectDB();

// Config view engine
configViewEngine(app);

// Init all routes
initRoutes(app);

app.listen(port, hostname, () => {
  console.log(`Server is running at => ${hostname}:${port}`);
});
