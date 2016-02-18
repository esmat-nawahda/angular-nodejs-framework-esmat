var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
// config obj 
var config = require('./config');
var mongoose = require('mongoose');
var app = express();

var http = require('http').Server(app);



// call database
mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	} else{
		console.log('connected to the database');
	}
});
//
// app ( obj express to do route for everything)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// to run all our public file(static file css $ javascript)
app.use(express.static(__dirname + '/public'));
var api = require('./server/routes/api')(app, express);
app.use('/api', api);

app.get('*' ,function(req, res){
	// all routing to the index.html
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port, function(err) {
	if(err){
		console.log(err);
	} else {
		console.log("Listning on port 3000");
	}
});