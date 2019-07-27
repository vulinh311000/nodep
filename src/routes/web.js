import express from "express";
import {
    getLoginRegister,
    getLogout,
    postRegister,
    getVerifyAccount,
    checkLoggedIn,
    checkLoggedOut
} from "../controllers/authController";
import {getHome} from "../controllers/homeController";
import {registerValidator} from '../validation/authValidation';
import passport from 'passport';
import initPassportLocal from '../controllers/passportController/local';
import initPassportFacebook from '../controllers/passportController/facebook';

// Init all passport
initPassportLocal();
initPassportFacebook();

const router = express.Router();

/**
 * Init all routes
 * @param app
 */

const initRoutes = app => {
    router.get("/", checkLoggedIn, getHome);
    router.get("/logout", checkLoggedIn, getLogout);

    router.get("/login-register", checkLoggedOut, getLoginRegister);
    router.post("/register", checkLoggedOut, registerValidator, postRegister);
    router.get("/verify/:token", checkLoggedOut, getVerifyAccount);
    router.post("/login", checkLoggedOut, passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/login-register',
        successFlash: true,
        failureFlash: true
    }));
    router.get('/auth/facebook',passport.authenticate("facebook",{
        scope: ["email"]
    }));
    router.get('/auth/facebook/callback',passport.authenticate('facebook',{
        successRedirect: '/',
        failureRedirect: '/login-register'
    }));
    app.use("/", router);
};

export default initRoutes;
