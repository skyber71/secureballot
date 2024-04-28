const express = require('express');
const user_route = express();
const userController = require("../controller/userController.js")

user_route.get("/", userController.home);
user_route.get("/login", userController.login);
user_route.get("/dashboard", userController.dashboard);
user_route.post("/register", userController.register);
module.exports = user_route;