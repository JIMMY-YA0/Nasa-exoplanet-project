const express = require("express");
const { getAllPlanets } = require("./planets.controller");

const planetRouters = express.Router();

planetRouters.get("/planets", getAllPlanets);

module.exports = planetRouters;
