let onoff = require ('onoff');
let Gpio = onoff.Gpio,
    rLED = new Gpio(4, 'out'), 
    yLED = new Gpio(17, 'out'),
    interval;

yLED.write(1, () => console.log('Initialising yellow'));   
 
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
  console.log('Bye Bye');
  process.exit();
});
