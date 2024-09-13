const express = require("express");
const app = express();
const mysql = require("mysql2");

const _PORT = 9999;

const db = mysql.createConnection({
  host: "localhost",
  user: "upward_user",
  password: "upward123",
  database: "upward",
});
async function executeQuery(sql, callback) {
  if (db.state === "disconnected") {
    db.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      db.query(sql, callback);
    });
  } else {
    db.query(sql, callback);
  }
}

app.get("/users", async (req, res) => {
  try {
    executeQuery(`select * from users`, (error, rows) => {
      if (error) {
        res.send({
          message: error.message,
        });
      }
      res.send({
        message: "manok na pula",
        rows,
      });
    });
    
  } catch (error) {
    console.log(error.message);
    res.send({
      message: error.message,
    });
  }
});

app.listen(_PORT, () => {
  console.log(`listen on http://localhost:${_PORT}/`);
});
