const express = require('express');
const user_route = express();
const userController = require("../controller/userController.js");
const checkForJwtToken = require("../middlewares/sessionChecks.js");

user_route.get("/", userController.home);
user_route.get("/login",userController.login);
user_route.get("/dashboard", checkForJwtToken, userController.dashboard);
user_route.post("/register", userController.register);
module.exports = user_route;