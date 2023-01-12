const launches = new Map();

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
// Launch.Set(Key, Value)

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}
//Building a data access function
function getAllLaunches() {
  return Array.from(launches.values());
}

//add launches
let latestFlightNumber = 100;
function addNewLaunch(launch) {
  // launches.set(launch.flightNumber, launch);
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["NASA", "Elon Musk", "ZTM"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  //modify luaches upcoming and success property to false.
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
