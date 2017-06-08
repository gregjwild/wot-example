const express = require('express'),
  router = express.Router();
  resources = require('../../resources/model');

// On GETing from index, the list of sensors on the pi will be sent.
router.route('/').get((req, res, next) => res.send(resources.pi.sensors));

// On GETing from /pir, the pir sensor data is sent. 
router.route('/pir').get((req, res, next) => res.send(resources.pi.sensors.pir));

// On GETing from /temperature, the temperature sensor data is sent. 
router.route('/temperature').get((req, res, next) => res.send(resources.pi.sensors.temperature));

// On GETing from /humidity, the humidity sensor data is sent. 
router.route('/humidity').get((req, res, next) => res.send(resources.pi.sensors.humidity));

module.exports = router;