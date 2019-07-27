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
import initPassportGoogle from '../controllers/passportController/google';

// Init all passport
initPassportLocal();
initPassportFacebook();
initPassportGoogle();

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
    router.get('/auth/facebook', checkLoggedOut, passport.authenticate("facebook", {
        scope: ["email"]
    }));
    router.get('/auth/facebook/callback', checkLoggedOut, passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login-register'
    }));
    router.get('/auth/google', checkLoggedOut, passport.authenticate("google", {
        scope: ["email","profile"]
    }))

    router.get('/auth/google/callback', checkLoggedOut, passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login-register'
    }));
    app.use("/", router);
};

export default initRoutes;
