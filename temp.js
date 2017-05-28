let sensorLib = require('node-dht-sensor');
sensorLib.initialize(22);

let interval = setInterval(() => {
	read();
}, 2000);


function read() {
  let readout = sensorLib.read();
  console.log(`
    Temperature: ${readout.temperature.toFixed(2)}c
    Humidity: ${readout.humidity.toFixed(2)}%
    `);
}
