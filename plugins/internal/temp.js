const resources = require('./../../resources/model'),
  utils = require('./../../utils/utils.js');

let interval, sensor;
const model = resources.pi.sensors;
const pluginName = 'Temperature and humidity';
let localParams = {'simulate': false, 'frequency': 5000};

exports.start = params => {
  localParams = params;
  if (params.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = () => {
	params.simulate ? clearInterval(interval) : sensor.unexport();
	console.info(`${pluginName} plugin stopped!`)
};

function connectHardware() {
	const sensorDriver = require('node-dht-sensor');
	
	const sensor = {
		initialize: () => sensorDriver.initialize(22, model.temperature.gpio),	
		read: () => {
			let readout = sensorDriver.read(); //#B
			model.temperature.value = parseFloat(readout.temperature.toFixed(2));
			model.humidity.value = parseFloat(readout.humidity.toFixed(2)); //#C
			showValue();
			
		    setTimeout(() => sensor.read(), localParams.frequency);
		}
  };
  
  if (sensor.initialize()) {
    console.info(`Hardware ${pluginName} sensor started!`);
    sensor.read();
  } else {
    console.warn('Failed to initialize sensor!');
  }
};

function simulate() {
  interval = setInterval(function () {
    model.temperature.value = utils.randomInt(0, 40);
    model.humidity.value = utils.randomInt(0, 100);
    showValue();
  }, localParams.frequency);
  console.info(`Simulated ${pluginName} sensor started!`);
};

function showValue() {
  console.info(`Temperature: ${model.temperature.value}c, Humidity: ${model.humidity.value}%`);
};

//#A Initialize the driver for DHT22 on GPIO 12 (as specified in the model)
//#B Fetch the values from the sensors
//#C Update the model with the new temperature and humidity values; note that all observers will be notified
//#D Because the driver doesn’t provide interrupts, you poll the sensors for new values on a regular basis with a regular timeout function and set sensor.read() as a callback
