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
import {updateAvatar, updateInfo, updatePassword, postSearchUser} from "../controllers/userController";
import {postAddNew, deleteRequestContact} from "../controllers/contactController";
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
    router.put('/user/update-avatar', checkLoggedIn, updateAvatar);
    router.put('/user/update-info', checkLoggedIn, updateInfo);
    router.put('/user/update-password', checkLoggedIn, updatePassword);
    router.post('/user/search', checkLoggedIn, postSearchUser);
    router.post('/contact/add-new', checkLoggedIn, postAddNew);
    router.delete('/contact/remove-request-contact', checkLoggedIn, deleteRequestContact);

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
        scope: ["email", "profile"]
    }))

    router.get('/auth/google/callback', checkLoggedOut, passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login-register'
    }));
    app.use("/", router);
};

export default initRoutes;
