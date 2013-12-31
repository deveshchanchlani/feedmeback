var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');

var broadcast = require('./libs/broadcast');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/feedmeback', routes.getFeedBack);
app.get('/feedbacks', routes.showFeedBacks);

app.post('/postAnswer', routes.postAnswer());

var server = http.createServer(app);

var port = app.get('port');
var serverListener = server.listen(port, function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//var io = socketio.listen(port);
var io = socketio.listen(serverListener);
broadcast.init(io);
