import dotenv from 'dotenv';
import session from 'express-session';
import connectMongo from 'connect-mongo';

dotenv.config();
const MongoStore = connectMongo(session);

const URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

/**
 * This variable is where save session, in this case is mongodb
 * */
export const sessionStore = new MongoStore({
    url: URI,
    autoReconnect: true
    // autoRemove:"native"
});

const configSession = (app) => {
    app.use(session({
        key: process.env.CS_KEY,
        secret: process.env.CS_SECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 8640000
        }
    }));
};

export default configSession;
