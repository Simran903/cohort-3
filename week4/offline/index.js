// create a http server
// express
// node default library = no

import express from "express";

const app = express();
app.use(express.json());

var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.get("/", function (req, res) {
  const totalNumberOfKidenys = users[0].kidneys.length;

  const healthyKidneys = users[0].kidneys.filter(
    (kidney) => kidney.healthy
  ).length;

  const unhealthyKidneys = totalNumberOfKidenys - healthyKidneys;

  res.json({
    totalNumberOfKidenys,
    healthyKidneys,
    unhealthyKidneys,
  });
});

app.post("/", function (req, res) {
  const ishealthy = req.body.ishealthy;
  users[0].kidneys.push({
    healthy: ishealthy,
  });
  res.json({ mssg: "done" });
});

app.put("/", function (req, res) {
  for (let i = 0; i < users[0].length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({ mssg: "done" });
});

app.delete("/", function (req, res) {
  const newKidneys = [];
  for (let i = 0; i < users[0].length; i++) {
    if (users[0].kidneys[i].healthy) {
      newKidneys.push({
        healthy: true,
      });
    }
  }
  users[0].kidneys = newKidneys;
  res.json({ mssg: "done" });
});

app.listen(3000);
