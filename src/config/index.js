const ENV = process.env.NODE_ENV || "development";
const config = require(`./${ENV}`);

module.exports = config;