const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./config/db');

const apiRoutes = require('./routes/apiRoutes');

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Dashboard API Running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
