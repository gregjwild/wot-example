const httpServer = require('./servers/http'),
	  resources = require('./resources/model'),
	  pirPlugin = require('./plugins/internal/pir');
	  dht22Plugin = require('./plugins/internal/temp');

const server = httpServer.listen(resources.pi.port, 
	console.info(`WoT Pi is up and running on ${resources.pi.port}`))
	
pirPlugin.start({'simulate': false, 'frequency': 2000});
dht22Plugin.start({'simulate': false, 'frequency': 10000});
