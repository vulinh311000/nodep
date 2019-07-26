import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import bodyParser from 'body-parser';

const hostname = "localhost";
const port = 8080;

// Init app
const app = express();

// Connect to MongoDB;
ConnectDB();

// Config view engine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

// Init all routes
initRoutes(app);

app.listen(port, hostname, () => {
    console.log(`Server is running at => ${hostname}:${port}`);
});
