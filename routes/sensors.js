const express = require('express'),
  router = express.Router(),
  resources = require('./../resources/model');

// On GETing from index, the list of sensors on the pi will be sent.
router.route('/').get((req, res, next) => {
	req.result = resources.pi.sensors;
	next()
});

// On GETing from /pir, the pir sensor data is sent. 
router.route('/pir').get((req, res, next) => {
	req.result = resources.pi.sensors.pir;
	next();
});

// On GETing from /temperature, the temperature sensor data is sent. 
router.route('/temperature').get((req, res, next) => {
	req.result = resources.pi.sensors.temperature;
	next();
});

// On GETing from /humidity, the humidity sensor data is sent. 
router.route('/humidity').get((req, res, next) => {
	req.result = resources.pi.sensors.humidity;
	next();
});

module.exports = router;
