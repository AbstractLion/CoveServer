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
  socket.on('change', (data) => {
    console.log(data)
    socket.broadcast.emit('change', data);
  });
})

server.listen(8080, () => {console.log("Listening...")}); 