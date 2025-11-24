const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey123456789';

const register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (row) return res.status(400).json({ message: "User already exists" });

    const hashed = bcrypt.hashSync(password, 10);
    db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashed], function(err) {
      if (err) return res.status(500).json({ message: "Registration failed" });

      const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  });
};

const logout = (req, res) => {
  res.json({ message: "Logged out (token should be cleared on client)" });
};

module.exports = { register, login, logout };