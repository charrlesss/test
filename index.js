const express = require("express");
const app = express();
const mysql = require("mysql2");
const { PrismaClient } = require("@prisma/client");
const _PORT = 9999;
const prisma = new PrismaClient();
const path = require('path')
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, "/view")));

app.get("/api/create-user",async(req,res)=>{
  try {
    const users = await prisma.users.createMany({
      data: [
        {
          username: "charles1",
          id: 0,
        },
        {
          username: "charles2",
          id: 0,
        },
        {
          username: "charles3",
          id: 0,
        },
        {
          username: "charles4",
          id: 0,
        },
        {
          username: "charles5",
          id: 0,
        },
        {
          username: "charles6",
          id: 0,
        },
        {
          username: "charles",
          id: 0,
        },
      ],
    });

    res.send({
      message: "Successfully Create",
      users,
    });
  } catch (error) {
    
    res.send({
      message: error.message,
    });
  }
})

app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
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


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/view/", "index.html"));
});


app.listen(_PORT, () => {
  console.log(`listen on http://localhost:${_PORT}/`);
});
