const express = require("express");
const app = express();
const mysql = require("mysql2");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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
    const users = await prisma.users
    res.send({
      message: "manok na pula",
      users,
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
