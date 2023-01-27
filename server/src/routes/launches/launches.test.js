const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../util/mongo");
const { loadPlanetData } = require("../../models/planets.model");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetData();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  //Test GET /launches
  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      // expect(response.statusCode).toBe(200);
    });
  });

  //Test POST /launches
  describe("Test POST /launch", () => {
    const completeLauncheData = {
      mission: "USS Enterprise",
      rocket: "Ncc 1701-D",
      target: "Kepler-62 f",
      launchDate: "January 4, 2030",
    };
    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "Ncc 1701-D",
      target: "Kepler-62 f",
    };
    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "Ncc 1701-D",
      target: "Kepler-62 f",
      launchDate: "zoot",
    };
    //test completeLauncheData
    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLauncheData)
        .expect("Content-Type", /json/)
        .expect(201);
      const requestDate = new Date(completeLauncheData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    //test launchDataWithoutDate
    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({ error: "Missing required launch property" });
    });

    //test launchDataWithInvalidDate
    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
