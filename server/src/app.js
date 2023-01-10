const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("./routes/planets.router");

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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(planetsRouter);

module.exports = app;
