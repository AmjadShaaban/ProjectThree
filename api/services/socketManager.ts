import { Socket } from 'socket.io';

interface ConnectedSockets {
  [socketId: string]: Socket;
}

export const connectedSockets: ConnectedSockets = {};

export function addSocket(socket: Socket) {
  console.log('Socket added', socket.id);
  connectedSockets[socket.id] = socket;

  socket.on('disconnect', () => {
    console.log('Socket removed', socket.id);
    delete connectedSockets[socket.id];
  });
}

export function emitToAllSockets(event: string, data: any) {
  Object.values(connectedSockets).forEach(socket => {
    socket.emit(event, data);
  });
}
