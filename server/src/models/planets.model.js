const planets = require("./planets.mongo");
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
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

//Building a data access function
async function getAllPlanets() {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    //insert + update = upsert, if it doesn't exist, upsert second argument into that collection.
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Cound not save planet ${err}`);
  }
}

module.exports = {
  getAllPlanets,
  loadPlanetData,
};
