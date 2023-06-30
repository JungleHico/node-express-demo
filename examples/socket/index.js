const socket = new WebSocket('ws://localhost:3000/socket/test');

socket.addEventListener('open', () => {
  console.log('connection open');
});

socket.addEventListener('message', (e) => {
  console.log(e.data);

  setTimeout(() => {
    socket.send('This is a message from client.');
  }, 1000);

  setTimeout(() => {
    socket.close();
  }, 2000);
});

socket.addEventListener('close', () => {
  console.log('connection close');
});
