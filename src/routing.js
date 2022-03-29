const Models 	= require('./db/models');
const URL 		= require('url');

const API_MODELS = [
	"pizzas",
	"orders"
]

const API_HANDLER = async (req, res, next) => {

	const [first, api, model, ...rest] = String(req.url).split('/');
	const path = rest.join('/');

	if ( API_MODELS.indexOf(model) === -1) return next({ message: "Unsupported model"});

	return res.status(200).json({
		hello: 'world'
	})
}

module.exports = async (req, res, next) => {

	let urlMap, parts, model, isApi = false;

	try {
		parts = String(req.url).split('/');
		isApi = parts && parts.length > 0 && parts[1] === 'api' ;
		urlMap = URL.parse(req.url);

		if ( isApi ) return await API_HANDLER(req, res, next);

		let path = urlMap.path.replace('/', '');

		// Non-api routes
		switch (path) {
			case 'health' : {
				return res.status(200).end("Ok!");
			}
			case 'favicon.ico': {
				return res.status(200).end("Not Implemented");
			}
			default :
				return next( "Unsupported route" );
		}
	} catch (e) {
		next(e)
	}
}