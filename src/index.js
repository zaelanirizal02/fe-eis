require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/api", function (req, res) {
  res.send("api chart");
});

app.get("/api/employes", async (req, res) => {
  const employes = await prisma.employe.findMany();

  res.send(employes);
});

//PENCARIAN BERDASARKAN NAMA
app.get("/api/employes/search", async (req, res) => {
  const searchKeyword = req.query.nama;

  if (!searchKeyword) {
    return res.status(400).send("Nama pencarian tidak diberikan.");
  }

  try {
    const searchResults = await prisma.employe.findMany({
      where: {
        nama: {
          contains: searchKeyword,
          mode: "insensitive", // Membuat pencarian case-insensitive
        },
      },
    });

    res.send(searchResults);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send("Terjadi kesalahan saat melakukan pencarian.");
  }
});

app.post("/api/employes", async (req, res) => {
  const newEmployeData = req.body;
  const employe = await prisma.employe.create({
    data: {
      nama: newEmployeData.nama,
      usia: newEmployeData.usia,
      pendidikan: newEmployeData.pendidikan,
      jenis_kelamin: newEmployeData.jenis_kelamin,
      lokasi_kerja: newEmployeData.lokasi_kerja,
      status_kerja: newEmployeData.status_kerja,
    },
  });
  res.send({
    data: employe,
    message: "add employe success",
  });
});

app.delete("/employes/:id", async (req, res) => {
  const employeId = req.params.id;

  await prisma.employe.delete({
    where: {
      id: parseInt(employeId),
    },
  });

  res.send("employ deleted");
});

app.listen(port, () => {
  console.log(`app running on :${port}`);
});
