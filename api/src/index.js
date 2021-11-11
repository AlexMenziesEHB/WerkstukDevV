const { log } = require("console");
const express = require("express");
const PORT = 3000

const app = express();

app.use(express.json());

const achievements = [{
    id: 1,
    name: "Welcome",
    points: "200",
    description: "Succesfully signed up"
  },
  {
    id: 2,
    name: "First try",
    points: "350",
    description: "Succesfully tried your first workout"
  },
  {
    id: 3,
    name: "Refer a friend",
    points: "100",
    description: "Let a friend join you with your journey"
  },
];

app.get("/", (req, res) => {
  return res.status(200).json({
    data: achievements
  });
});

app.post("/send", (req, res) => {
  achievements.push({
    id: Math.floor(Math.random() * 100),
    name: req.body.name,
    points: req.body.points,
    description: req.body.description,
  });
  return res.status(201).json({
    data: achievements
  });
});

app.put("/update/:id", (req, res) => {
  const obj = achievements.find((el) => el.id === Number(req.params.id));
  obj.name = req.body.name;
  return res.status(200).json({
    data: achievements
  });
});

app.delete("/destroy/:id", (req, res) => {
  const i = achievements.findIndex((el) => el.id === Number(req.params.id));
  achievements.splice(i, 1);
  return res.status(200).json({
    data: achievements
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT);
  console.log(`app listening on ${PORT}`);
}

module.exports = app;