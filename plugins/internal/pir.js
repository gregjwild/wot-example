const resources = require('./../../resources/model');

let interval, sensor;

const model = resources.pi.sensors.pir;
const pluginName = resources.pi.sensors.pir.name;
let localParams = {'simulate': false, 'frequency': 2000};

exports.start = params => {
		localParams = params;
		params.simulate ? simulate() : connectHardware();
}

exports.stop = () => {
	localParams.simulate ? clearInterval(interval) : sensor.unexport();
	console.info(`${pluginName} has been stopped.`);
}

function connectHardware() {
	const Gpio = require('onoff').Gpio;
	sensor = new Gpio(model.gpio, 'in', 'both');
	sensor.watch((err, val) => {
		if (err) exit(err);
		model.value = !val;
		showValue();
	});
	console.info(`Hardware ${pluginName} sensor started.`);
}

function simulate() {
	interval = setInterval(() => {
	model.value = !model.value;
	showValue();
	}, localParams.frequency);
	console.info(`Simulated ${pluginName} sensor started.`);
}

function showValue() {
	console.info(model.value ? "Someone is there" : "Not any more");
}
