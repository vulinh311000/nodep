import express from "express";
import {getLoginRegister, getLogout, postRegister, getVerifyAccount} from "../controllers/authController";
import {getHome} from "../controllers/homeController";
import {registerValidator} from '../validation/authValidation';
import passport from 'passport';
import initPassportLocal from '../controllers/passportController/local';

// Init all passport
initPassportLocal();

const router = express.Router();

/**
 * Init all routes
 * @param app
 */

const initRoutes = app => {
    router.get("/", getHome);
    router.get("/login-register", getLoginRegister);
    router.post("/register", registerValidator, postRegister);
    router.get("/logout", getLogout);
    router.get("/verify/:token",getVerifyAccount);
    router.post("/login",passport.authenticate("local",{
        successRedirect: '/',
        failureRedirect: '/login-register',
        successFlash:true,
        failureFlash:true
    }));
    app.use("/", router);
};

export default initRoutes;
