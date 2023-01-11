const { getAllLaunches, addNewLaunch } = require("../models/launches.model");

function httpGetAllLaunches(req, res) {
  //using Array.from() creates a new, shallow-copied Array instance from an iterable or array-like object.
  //cover map object to an array.
  return res.status(200).json(Array.from(getAllLaunches));
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
