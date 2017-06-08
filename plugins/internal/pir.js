const Gpio = require('onoff').Gpio;
const sensor = new Gpio(17, 'in', 'both');

sensor.watch((err, val) => {
  if (err) exit(err);
  console.log(val ? 'there is someone!' : 'not anymore!');
});

function exit(err) {
  if (err) console.log(`An error occurred ${err}`);
  sensor.unexport();
  console.log('Bye, bye!');
  process.exit();
}

process.on('SIGINT', exit);


