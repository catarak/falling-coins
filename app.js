var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static('public'));

var mode = 0;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

http.listen(4321, function() {
	console.log('Listening on port 4321!');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('change-mode', {mode: mode});
  socket.on('change-mode', function (data) {
		mode = data.mode;
		io.emit('change-mode', {mode: mode});
  });
});