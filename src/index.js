const express		= require('express');
const config		= require('./config');
const { Connect } 	= require('./db/connect');
const app 			= express();
const routing 		= require('./routing');
const PORT	= config.server.PORT || 3000;

app
	.set( 'port', PORT )
	.use( express.json({ limit: '10mb' }) )
	.disable( 'x-powered-by' )

app.listen( PORT, async err => {
	if ( err ) {
		// Should log error and kill server
		console.error( `Could not start app: ${err}` );
		process.exit( 1 );
	} else {
		const dbConnection = await Connect.open();
		if ( dbConnection ) {
			console.log( `Server started on port ${PORT}` )
		} else {
			// Could not connect to DB so should log error and kill server
			console.log( `Could not connect to DB. Killing server.` )
			process.exit( 1 );
		}
	}
})

// Routing
app.all( '*', async function( req, res, next ) {
	routing(req, res, next)
})

app.use( '*', async function ( err, req, res, next  ) {
	return res.status(500).json( err );
})

// Default Error Handling
const NODE_ERRORS = ['uncaughtException', 'unhandledRejection', 'SIGTERM'];
for ( let event of NODE_ERRORS ) {
	process.on( event, err => {
		// Log error
		console.error( `Server error ${event}.\nKilling Server.`);
		console.error(err);
		try { app.close() } catch (e) {}
		process.exit( 0 );
	})
}