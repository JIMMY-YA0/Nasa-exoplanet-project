const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

// Connect launches to values via iterator

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch); //Gives response and data..
}

// function httpAbortLaunch(req, res) {
//   const launchId = Number(req.params.id);
//   // if launch DNE
//   if (!existLaunchWithID(launchId)) {
//     return res.status(404).json({
//       error: "Launch not found",
//     });
//     //if launch does exist
//   } else if (existLaunchWithID(launchId)) {
//     const abortedLaunch = abortLaunchById(launchId);
//     return res.status(200).json(abortedLaunch);
//   }
// }

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  // if launch doesn't exist
  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  //if the lauch does exist
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
