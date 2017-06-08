let sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12);

let interval = setInterval(() => {
  logBoth(sensorLib);
}, 2000);


function logBoth(sensor) {
  logTemp(sensor);
  logHumi(sensor);
}

function logTemp(sensor) {
  console.log(`Temperature: ${readTemp(sensor)}c`);
}

function logHumi(sensor) {
  console.log(`Humidity: ${readHumi(sensor)}%`);
}

function readTemp(sensor) {
  let readout = sensor.read();
  return readout.temperature.toFixed(2);
}

function readHumi(sensor) {
  let readout = sensorLib.read();
  return readout.humidity.toFixed(2);
} 
