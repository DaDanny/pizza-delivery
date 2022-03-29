require('dotenv').config();

const global = require('./global');

const config = {
	server: {
		...global.server
	},
	DEVELOPMENT: process.env.DEVELOPMENT,
	...global
};

module.exports = config;