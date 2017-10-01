const router = require('express').Router();
	bodyParser = require('body-parser'),
	resources = require('./../resources/model');

router.route('/leds/:id').get( (req, res, next) => {
	req.result = resources.pi.actuators.leds(req.params.id);
	next();
});
	
router.route('/leds/:id').put( (req, res, next) => {
	console.log(req);
	let selectedLed = resources.pi.actuators.leds[req.params.id];
	selectedLed.value = req.body.value;
	console.info(`Changed LED ${req.params.id} value to ${selectedLed.value}`);
	req.result = selectedLed;
	next();
});

module.exports = router;
