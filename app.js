const http = require('http');
const request = require('request');

const PORT = 8585;

http.createServer((req, res) => simpleRest(req, res)).listen(PORT);

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

function simpleRest(req, res) {
  console.log(`${req.method} | ${req.url}`);
  res.writeHeader(200, {"Content-Type": "application/json"});git
  switch (req.url){
	  case '/temperature': 
		let currentTemp = randomInt(1, 40);
		console.log(`Current temp: ${currentTemp}`);
		res.write(`{"temperature": ${currentTemp}}`);
		break
		
	  case '/light':
		let currentLight = randomInt(1, 100);
		console.log(`Current light: ${currentLight}`);
		res.write(`{"light": ${currentLight}}`);
		break
		
	  default:
	    console.log("Default Data");
		res.end('{"Hello": "World"}');

	}
    res.end();
}

console.log(`Server running on port ${PORT}.`);
