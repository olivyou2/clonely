import { io, Socket } from 'socket.io-client';

export default class NetworkManager {
  socket: Socket;

  constructor() {
    this.socket = io('ws://localhost:4000');
  }

  async connectRequest(accessToken: string) {
    return new Promise((res) => {
      this.socket.emit('entrance', accessToken);

      this.socket.once('entranceSelf', (sessions, session) => {
        res({
          session,
          sessions,
        });
      });
    });
  }

  move(x:Number, y:Number) {
    this.socket.emit('move', x, y);
  }
}
