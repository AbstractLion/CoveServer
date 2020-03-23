const socket = io('http://localhost:8080');
socket.on('change', function(data) {
  console.log(data);
  document.getElementById('content').value = data;
});

document.getElementById('content').addEventListener('input', (e) => {
  socket.emit('change', document.getElementById('content').value);
});