const express = require("express");
const { httpGetAllPlanets } = require("../planets/planets.controller");

const planetRouters = express.Router();

planetRouters.get("/", httpGetAllPlanets);

module.exports = planetRouters;
