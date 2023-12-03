const express = require("express");
const { login, register, isAuth } = require("../controllers/User.controller");
const { registerValidation, loginValidation } = require("../validations/auth");
const checkAuth = require("../utils/checkAuth");
const errorHandlers = require("../utils/errorHandlers");

const authRouter = express.Router();

authRouter.post("/login", loginValidation, errorHandlers, login);
authRouter.post("/register", registerValidation, errorHandlers, register);
authRouter.get("/me", checkAuth, isAuth);

module.exports = authRouter;
