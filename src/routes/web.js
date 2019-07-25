import express from "express";
import { getLoginRegister, getLogout } from "../controllers/authController";
import { getHome } from "../controllers/homeController";

const router = express.Router();

/**
 * Init all routes
 * @param app
 */

const initRoutes = app => {
  router.get("/", getHome);

  router.get("/login-register", getLoginRegister);

  router.get("/logout", getLogout);

  return app.use("/", router);
};

module.exports = initRoutes;
