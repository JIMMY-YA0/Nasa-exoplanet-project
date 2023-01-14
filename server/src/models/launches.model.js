const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100, // caculate
  mission: "Kepler Exploration X", // user input
  rocket: "Explorer IS1", // user input
  launchDate: new Date("December 27, 2030"), // user input
  target: "Kepler-442 b", // user input
  customer: ["NASA", "Elon Musk", "Space X"], // standard input
  upcoming: true, // standard input until date past
  success: true, // standard input until date past where something goes wrong
};

saveLaunch(launch);

//Return boolean based on if flightNumber does exist
async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  // The doc is sorted in descending order based on flightNumber and findOne() will return the first one document in the list
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

//Building a data access function
async function getAllLaunches() {
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

// Save Launches
async function saveLaunch(launch) {
  //validate planet input
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet found");
  }
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

// Add new launches
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customer: ["NASA", "Elon Musk", "ZTM"],
    upcoming: true,
    success: true,
  });

  await saveLaunch(newLaunch);
}

// Abort launches
async function abortLaunchById(launchId) {
  // const aborted = launches.get(launchId);
  // //modify luaches upcoming and success property to false.
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
