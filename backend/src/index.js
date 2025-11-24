const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./config/db');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const authenticate = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.post('/auth/logout', authController.logout);

app.get('/dashboard', authenticate, dashboardController.getDashboard);
app.post('/dashboard', authenticate, dashboardController.saveDashboard);

304
app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT || 5000}`);
});