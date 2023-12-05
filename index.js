require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { prisma } = require("./config/prisma");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("here is the response");
});

app.get("/rooms", async (req, res) => {
  const room = await prisma.room.findMany();
  res.status(200).send(room);
});

app.get("/rooms/:id", async (req, res) => {
  const room = await prisma.room.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.status(200).send(room);
});

app.all("*", async (req, res) => {
  res.json({
    message: "Routes you're looking is not found",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is already running at ${PORT}`);
});