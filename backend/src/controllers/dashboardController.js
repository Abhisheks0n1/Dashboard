const db = require('../config/db');

const getDashboard = (req, res) => {
  const userId = req.user.id;
  db.get("SELECT config FROM dashboards WHERE user_id = ?", [userId], (err, row) => {
    if (err || !row) return res.json({ widgets: [] });
    res.json(JSON.parse(row.config));
  });
};

const saveDashboard = (req, res) => {
  const userId = req.user.id;
  const config = JSON.stringify(req.body);

  db.run(
    "INSERT OR REPLACE INTO dashboards (user_id, config) VALUES (?, ?)",
    [userId, config],
    (err) => {
      if (err) return res.status(500).json({ message: "Save failed" });
      res.json({ message: "Dashboard saved successfully" });
    }
  );
};

module.exports = { getDashboard, saveDashboard };