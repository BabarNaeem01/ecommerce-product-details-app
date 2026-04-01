const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 4106;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment3_app6"
});

app.get("/product", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, title, image, price, description FROM products LIMIT 1");
    res.json(rows[0] || null);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App 6 server running on http://localhost:${PORT}`);
});
