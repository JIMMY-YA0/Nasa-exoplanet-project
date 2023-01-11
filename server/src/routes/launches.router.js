const express = require("express");
const { httpGetAllLaunches, httpAddNewLaunch } = require("./launches.controller");
const launchesRouter = express.Router();

//path will be /launches/...
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
module.exports = launchesRouter;
