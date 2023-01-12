const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

//middleware
//deal with CORS
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
//deal with logs
app.use(morgan("combined"));

//deal with body requests
app.use(express.json());

//serving static files
app.use(express.static(path.join(__dirname, "..", "public")));
//routers
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
