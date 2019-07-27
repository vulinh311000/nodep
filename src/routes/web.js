import express from "express";
import {getLoginRegister, getLogout, postRegister, getVerifyAccount} from "../controllers/authController";
import {getHome} from "../controllers/homeController";
import {registerValidator} from '../validation/authValidation';

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
    router.get("/test", (req, res) => {
        res.send("<h1>Test</h1>");
    });
    router.get("/verify/:token",getVerifyAccount);
    app.use("/", router);
};

export default initRoutes;
