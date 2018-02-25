const express = require('express');
var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./app/views'));
// DB
MongoClient.connect(db.url, function(err, database) {
	if(err) return console.log(err);
	const db = database.db("bibliotech");
	require('./app/routes/')(app,db);
	app.listen(port, () => {
		console.log("We are live on port:"+port);
	});
});
// DB
