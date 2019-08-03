import dotenv from 'dotenv';
import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import configSession, {sessionStore} from './config/session';
import passport from 'passport';
import http from 'http';
import socketio from 'socket.io';
import initSockets from './sockets/index';
import passportSocketIo from 'passport.socketio';
import cookieParser from 'cookie-parser';

dotenv.config();

// Init app
const app = express();

// Init server with socket.io & express app
const server = http.createServer(app);
const io = socketio(server);

// Connect to MongoDB;
ConnectDB();

// Config session
configSession(app);

// Config view engine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

// Enable flash message
app.use(connectFlash());

// Use Cookie Parser
app.use(cookieParser());

// Config passport js
app.use(passport.initialize());
app.use(passport.session());

// Init all routes
initRoutes(app);

// Io use passport socket io
io.use(passportSocketIo.authorize({
    cookieParser,
    key: process.env.CS_KEY,
    secret: process.env.CS_SECRET,
    store: sessionStore,
    success: (data, accept) => {
        if (!data.user.logged_in) return accept("Invaid user.", false);
        return accept(null, true);
    },
    fail: (data, message, error, accept) => {
        if (error) {
            console.log('Failed to connection socket.io: ', error);
            return accept(new Error(message), false);
        }
    }
}));

// Init all sockets
initSockets(io);

server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Server is running at => ${process.env.APP_HOST}:${process.env.APP_PORT}`);
});

// =-=-=-=-=-=-=-=-=

/*
import dotenv from 'dotenv';
import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import configSession from './config/session';
import passport from 'passport';

dotenv.config();

// Init app
const app = express();

// Connect to MongoDB;
ConnectDB();

// Config session
configSession(app);

// Config view engine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

// Enable flash message
app.use(connectFlash());

// Config passport js
app.use(passport.initialize());
app.use(passport.session());

// Init all routes
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Server is running at => ${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
*/
