import dotenv from 'dotenv';
import mongoose from "mongoose";
import bluebird from "bluebird";

dotenv.config();
const connectDB = () => {
    mongoose.Promise = bluebird;
    mongoose.set('useCreateIndex', true);

    const URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    return mongoose.connect(URI, {
        useCreateIndex: true,
        useNewUrlParser: true
    });
};

module.exports = connectDB;
