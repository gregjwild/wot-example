const msgpack = require('msgpack5')(),
    encode = msgpack.encode,
    json2html = require('node-json2html');

module.exports = () => (req, res, next) => {
    console.info('Representation converter middleware called:');

    if (req.result) {
		// HTML
		if (req.accepts('html')) {
			console.info('HTML representation selected:');      
			const transform = {'tag': 'div', 'html': '${name} : ${value}'};
			res.send(json2html.transform(req.result, transform));
			return;
		}
		// MSGPACK
		if (req.accepts('application/x-msgpack')) {
			console.info('MessagePack representation selected:');
			res.type('application/x-msgpack');
			res.send(encode(req.result));
			return;
		}
		// DEFAULT TO JSON
		console.info('Defaulting to JSON representation:');
		res.send(req.result);
		return;
	}
	else {
		next();
	}
}
