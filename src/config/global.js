module.exports = {
	server: {
		PORT: process.env.PORT || 3000
	},
	db: {
		USERNAME	: process.env.DB_USERNAME,
		PASSWORD	: process.env.DB_PASSWORD,
		DB_NAME		: process.env.DB_NAME,
		PORT		: process.env.MONGO_PORT || 27017
	},
}