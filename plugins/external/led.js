// Allows us to watch the current status of the LED/.
const WatchJS = require('melanke-watchjs');
const watch = WatchJS.watch;

const resources = require('./../../resources/model');
const model = resources.pi.actuators.leds['1'];

let actuator, interval;
let pluginName = model.name;
let localParams = {'simulate': false, 'frequency': 2000};

// Starts the LED plugin.
// Should be passed a parameter object indicating whether
// The LED will be simulated, and if so, what frequency it will turn
// on and off.
exports.start = params => {
  localParams = params;
  observe(model);
  
  localParams.simulate ? 
	simulate() : 
	connectHardware(model.gpio);
};

// Stops the LED plugin.
exports.stop = () => {
  localParams.simulate ? 
	clearInterval(interval) : 
	actuator.unexport();
  console.info(`${pluginName} plugin stopped!`);
};

// Watches the model for changes. 
// Pass in the LED number to be watched.
function observe(what) {
  watch(what, changes => {
    console.info(`change detected by plugin for ${pluginName}...`);
    switchOnOff(model.value);
  });
};

// Reverses the current status of the LED.
// If true, then the LED is given the value, otherwise 0.
function switchOnOff(value) {
  if (!localParams.simulate) {
    actuator.write(value === true ? 1 : 0, () => {
      console.info(`Changed value of ${pluginName} to ${value}`);
    });
  }
};

// As you might expect, this connects to the hardware
function connectHardware(ledGpio) {
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(ledGpio, 'out'); 
  console.info(`Hardware ${pluginName} actuator started!`);
};

// Used when the LED is not available to simulate behaviour.
function simulate() {
  interval = setInterval(function () {
    // Switch value on a regular basis
    model.value ? 
		model.value = false:
		model.value = true;
  }, localParams.frequency);
  console.info(`Simulated ${pluginName} actuator started!`);
};
