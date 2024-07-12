const app = require("../src/app");
const request = require("supertest");

test("Testar rota /signin", async () => {
  const response = await request(app)
    .post("/signin")
    .send({ username: "testadoron1@gmail.com", password: "4026.Test" });

  expect(response.status).toBe(200);
});
