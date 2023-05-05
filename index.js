const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const Axios = require("axios");

const player_db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "19496De6s!",
  database: "NPE_PLAYER_WEEKLY_DATA",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.listen(3010, () => {
  console.log("database running on port 3010");
});

app.post("/get-player-data", (req, res) => {
  const name = req.body.name;
  const sqlSelect =
    'SELECT * FROM NPE_data WHERE name = "' +
    name +
    '" ORDER BY year DESC, week DESC';

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-passing-yards", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(passingYards) AS sumPassingYards FROM NPE_data GROUP BY name ORDER BY sumPassingYards DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-passing-touchdowns", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(passingTouchdowns) AS sumPassingTouchdowns FROM NPE_data GROUP BY name ORDER BY sumPassingTouchdowns DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-passing-completions", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(passingCompletions) AS sumPassingCompletions FROM NPE_data GROUP BY name ORDER BY sumPassingCompletions DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-rushing-attempts", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(rushingAttempts) AS sumRushingAttempts FROM NPE_data GROUP BY name ORDER BY sumRushingAttempts DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-rushing-yards", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(rushingYards) AS sumRushingYards FROM NPE_data GROUP BY name ORDER BY sumRushingYards DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-rushing-touchdowns", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(rushingTouchdowns) AS sumRushingTouchdowns FROM NPE_data GROUP BY name ORDER BY sumRushingTouchdowns DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-receiving-receptions", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(receivingReceptions) AS sumReceivingReceptions FROM NPE_data GROUP BY name ORDER BY sumReceivingReceptions DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-receiving-yards", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(receivingYards) AS sumReceivingYards FROM NPE_data GROUP BY name ORDER BY sumReceivingYards DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-receiving-touchdowns", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(receivingTouchdowns) AS sumReceivingTouchdowns FROM NPE_data GROUP BY name ORDER BY sumReceivingTouchdowns DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-fantasy-performance", (req, res) => {
  const sqlSelect =
    "SELECT name, date, fantasyDataPPR FROM NPE_data ORDER BY fantasyDataPPR DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-fumbles-lost", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(fumblesLost) AS sumFumbles FROM NPE_data GROUP BY name ORDER BY sumFumbles DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-passing-interceptions", (req, res) => {
  const sqlSelect =
    "SELECT name, COUNT(*) AS games, SUM(passingInterceptions) AS sumInterceptions FROM NPE_data GROUP BY name ORDER BY sumInterceptions DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get-top-passer-rating-all-time", (req, res) => {
  const sqlSelect =
    "SELECT * FROM (SELECT name, COUNT(*) AS starts, ROUND(AVG(passingRating), 2) AS avgPassingRating FROM NPE_data WHERE passingAttempts > 0 GROUP BY name ORDER BY avgPassingRating) AS fullList WHERE fullList.starts > 12 ORDER BY fullList.avgPassingRating DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//OFFENSIVE SNAPS WERE NOT RECORDED UNTIL 2012
app.get("/get-most-snaps-all-time", (req, res) => {
  const sqlSelect =
    "SELECT name, SUM(offensiveSnaps) AS sumSnaps FROM NPE_data GROUP BY name ORDER BY sumSnaps DESC LIMIT 15";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/def-least-PPG", (req, res) => {
  const sqlSelect =
    "SELECT fullName, year, pointsAllowedPG FROM NPE_defenses ORDER BY pointsAllowedPG ASC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/def-most-PPG", (req, res) => {
  const sqlSelect =
    "SELECT fullName, year, pointsAllowedPG FROM NPE_defenses ORDER BY pointsAllowedPG DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/custom-query", (req, res) => {
  let sqlStatement = req.body.sql;
  let finalStatement = sqlStatement
    .replace(/Players/g, "NPE_data")
    .replace(/Defenses/g, "NPE_defenses")
    .replace(/;/g, " ");

  let lowerCased = sqlStatement.toLowerCase();

  finalStatement += " LIMIT 100";

  if (
    lowerCased.indexOf("delete") > -1 ||
    lowerCased.indexOf("update") > -1 ||
    lowerCased.indexOf("drop") > -1 ||
    lowerCased.indexOf("insert") > -1
  ) {
    res.sendStatus(500);
  } else {
    player_db.query(finalStatement, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
});

app.get("/get-complete-stats", (req, res) => {
  let sqlSelect =
    "SELECT * FROM NPE_data, NPE_Defenses WHERE NPE_data.year = NPE_defenses.year AND NPE_data.opp = NPE_defenses.tag AND NPE_data.start = 1  ORDER BY rushingAttempts DESC, rushingYards DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/avg-stats-query", (req, res) => {
  let sqlSelect =
    "SELECT COUNT(*) AS numGames, name, AVG(fumblesLost) AS avgFumbles, SUM(fumblesLost) AS sumFumbles, SUM(fantasyDataPPR) AS totalFantasyPoints FROM NPE_data GROUP BY name ORDER BY avgFumbles DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/non-start-query", (req, res) => {
  let sqlSelect =
    "SELECT name, SUM(passingYards + rushingYards + receivingYards) AS totalYards, COUNT(*) AS numGames, MIN(year) AS startYear, MAX(year) AS endYear FROM NPE_data WHERE start != 1 AND year >= 2000 GROUP BY name ORDER BY totalYards DESC LIMIT 5";

  player_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
