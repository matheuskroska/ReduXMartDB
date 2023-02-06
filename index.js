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

pool.query(
  "CREATE TABLE users (id serial PRIMARY KEY, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, email VARCHAR(355) UNIQUE NOT NULL)",
  (err, result) => {
    if (err) {
      console.error(err.toString());
    } else {
      console.log("Tabela de usuários criada com sucesso!");
    }
  }
);

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
