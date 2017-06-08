const httpServer = require('./servers/http'),
  resources = require('./resources/model');

const server = httpServer.listen(resources.pi.port, () => console.info(`WoT Pi is up and running on ${resources.pi.port}`));