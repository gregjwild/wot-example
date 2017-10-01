const express = require('express'),
  actuatorsRoutes = require('./../routes/actuators'),
  sensorRoutes = require('./../routes/sensors'),
  resources = require('./../resources/model'),
  cors = require('cors'),
  converter = require('./../middleware/converter'),
  bodyParser = require('body-parser');
  

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Primary Routes
app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorRoutes);

// Main page
app.get('/pi', (req, res) => res.send('This is the WoT-pi!'));

// Convert responses according to reqest: either HTML, msgpack or JSON.
app.use(converter());

module.exports = app;
