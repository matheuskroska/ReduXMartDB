const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  user: "mhkroska",
  host: "localhost",
  database: "devnology",
  password: "12345",
  port: 5432,
});

app.get("/", (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.send(JSON.stringify(result.rows));
    }
  });
});

app.listen(3002, () => {
  console.log("Servidor rodando na porta 3000!");
});
