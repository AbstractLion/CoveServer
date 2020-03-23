const http = require('http');
const express = require('express');
const path = require('path');
app = module.exports.app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.on('connect', (socket) => {
  console.log('connected');
  socket.on('textChange', (changes) => {
    socket.broadcast.emit('textChange', changes);
  });
});

server.listen(8080, () => {console.log("Listening...")}); 