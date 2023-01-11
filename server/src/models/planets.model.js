const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
const habitablePlanet = [];
//the createReadStream return readable strem but in raw buffer or bytes
function loadPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
      //pipe connect readable stream to a writeable stream.
      .pipe(
        parse({
          //treat lines that start with # as comment
          comment: "#",
          //Return each row in csv file as JS object with key value pairs, rather than just an array.
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanet.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanet.length} habitable planets found!`);
        console.log("done");
        resolve();
      });
  });
}

//Building a data access function
function getAllPlanets() {
  return habitablePlanet;
}
module.exports = {
  getAllPlanets,
  loadPlanetData,
};
