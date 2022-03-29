const config 			= require('../config');
const { MongoClient } 	= require('mongodb');
const mongoUri =
	`mongodb://${config.db.USERNAME}:${config.db.PASSWORD}@pizza-db:${config.db.PORT}`

class Connect {
	constructor() {
		console.log('db connect!');
		this.db = null;
	}

	static async open() {
		if (this.db) return this.db;

		try {
			this.db = await MongoClient.connect(mongoUri);
			return this.db;
		} catch (e) {
			// Could not connect to DB
			console.error(`DB Connect Error: ${e}`);
		}
	}
}

module.exports = { Connect };