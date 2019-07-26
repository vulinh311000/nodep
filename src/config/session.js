import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);
const DB_CONNECTION = "mongodb";
const DB_HOST = "localhost";
const DB_PORT = "27017";
const DB_NAME = "chat";

const URI = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

/**
 * This variable is where save session, in this case is mongodb
 * */
const sessionStore = new MongoStore({
    url:URI,
    autoReconnect:true
    // autoRemove:"native"
});

const configSession = (app) => {
    app.use(session({
        key:"express.sid",
        secret:"mySecret",
        store:sessionStore,
        resave:true,
        saveUninitialized:false,
        cookie:{
            maxAge: 8640000
        }
    }));
};

export default configSession;
