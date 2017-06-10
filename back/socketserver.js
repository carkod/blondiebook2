import io from 'socket.io';
import http from 'http';

var config = {};

if (process.env.NODE_ENV === 'development') {
  config.port = 3000;
  config.host = 'localhost';

}

    
    const webServer = server.listen(8081, 'localhost', err => {
      if (err) throw err;
      console.log('Web server listening at http://%s:%d', config.host, config.port);
    });
    
  const socketServer = io(webServer);
  const connections = [];
 
  socketServer.on('connection', socket => {
    connections.push(socket);
 
    socket.on('message', data => {
      connections.forEach(connectedSocket => {
        if (connectedSocket !== socket) {
          connectedSocket.emit('message', data);
        }
      });
    });
 
    socket.on('disconnect', () => {
      const index = connections.indexOf(socket);
      connections.splice(index, 1);
    });
  });
