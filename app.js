const Express = require('express');
const app = new Express();
const PORT = 8585;

app.get('/', (req, res) => getStatus(req, res));
app.listen(8585, () => initialize());

let onoff = require ('onoff');
let Gpio = onoff.Gpio,
    rLED = new Gpio(4, 'out'), 
    yLED = new Gpio(17, 'out'),
    interval;

function initialize() {
    console.log(`Server running on port ${PORT}.`);
    yLED.write(1, () => console.log('Initialising yellow'));   
}

function getStatus(req, res) {
    res.send(`
    Yellow: ${yLED.readSync()}
    Red: ${rLED.readSync()}
    `);
}

 
interval = setInterval(() => {
  //LIGHTS!
  let rVal = rLED.readSync();
  let yVal = yLED.readSync();
  rVal == 0 ? 
	rLED.write(1, () => console.log("Switching red on.")) : 
	rLED.write(0, () => console.log("Switching red off."));
  yVal == 0 ? 
	yLED.write(1, () => console.log("Switching yellow on.")) : 
	yLED.write(0, () => console.log("Switching yellow off."));	 	 
},2000);

process.on('SIGINT', () => {
  clearInterval(interval);
  rLED.writeSync(0);
  yLED.writeSync(0);
  rLED.unexport();
  yLED.unexport();
  console.log('\nBye Bye');
  process.exit();
});
