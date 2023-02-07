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

app.post("/customers", (req, res) => {
  const { name, email, password } = req.body;
  pool.query(
    "INSERT INTO customers (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password],
    (err, result) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        res.send("Customer added successfully!");
      }
    }
  );
});

app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM customers WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.send(JSON.stringify(result.rows[0]));
    }
  });
});

app.post("/orders", (req, res) => {
  const { customer_id, date, payment_method } = req.body;
  pool.query(
    "INSERT INTO orders (customer_id, date, payment_method) VALUES ($1, $2, $3)",
    [customer_id, date, payment_method],
    (err, result) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        res.send("Order added successfully!");
      }
    }
  );
});

app.get("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  pool.query("SELECT * FROM orders WHERE id = $1", [orderId], (err, result) => {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.send(JSON.stringify(result.rows[0]));
    }
  });
});

app.listen(3002, () => {
  console.log("Servidor rodando na porta 3000!");
});
