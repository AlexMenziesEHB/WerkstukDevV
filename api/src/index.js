const express = require('express');
const bodyParser = require("body-parser");
const PORT = 3000;
const fs = require("fs");

let achievements = require("../src/data/achievements.json");

const app = express();

const save = () => {
  fs.writeFile(
    "../src/data/achievements.json",
    JSON.stringify(achievements, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

app.get("/", (req, res) => {
  res.json(achievements);
});

app.get("/:name", (req, res) => {
  const findAchievement = achievements.find((name) => name.name === req.params.name);
  if (!findAchievement) {
    res.status(404).send("achievement with name was not found");
  } else {
    res.json(findAchievement);
  }
});

app.post("/", bodyParser.json(), (req, res) => {
  achievements.push(req.body);
  save();
  res.json({
    status: "success",
    achievementInfo: req.body,
  });
});

app.put("/:name", bodyParser.json(), (req, res) => {
  achievements = achievements.map((name) => {
    if (name.name === req.params.name) {
      return req.body;
    } else {
      return name;
    }
  });
  save();

  res.json({
    status: "success",
    achievementInfo: req.body,
  });
  //   }
});

app.delete("/:name", (req, res) => {
  achievements = achievements.filter((name) => name.name !== req.params.name);
  save();
  res.json({
    status: "success",
    removed: req.params.name,
    newLength: achievements.length,
  });
});


app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});