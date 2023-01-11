const launches = new Map();

// const launch = {
//   flightNumber: 100,
//   mission: "Kepler Exoplanet X",
//   rocket: "Exploreer IS1",
//   launchDate: new Date("December 27, 2030"),
//   destination: "Kepler-442 b",
//   customer: ["NASA", "Space X"],
//   upcoming: true,
//   success: true,
// };

//add launches
let lastFlightNumber = 100;
function addNewLaunch(launch) {
  lastFlightNumber++;
  launches.set(
    lastFlightNumber,
    Object.assign(launch, {
      flightNumber: lastFlightNumber,
      customer: ["NASA", "Space X"],
      upcoming: true,
      success: true,
    })
  );
}

//Building a data access function
function getAllLaunches() {
  return Array.from(launches.values());
}

module.exports = {
  addNewLaunch,
  getAllLaunches,
};
