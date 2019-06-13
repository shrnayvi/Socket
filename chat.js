class Chat {
  constructor(io) {
    this.chat = io.of('/chat')
    this.init();
  }

  init() {
    this.chat
      .on('connection', async socket => {
        socket.on("publicChat", data => {
          this.broadcast(socket, 'PublicMessageReceived', data);
        });
      });
  }

  emit(socket, handle, data) {
    socket.emit(handle, data);
  }

  broadcast(socket, handle, data) {
    socket.broadcast.emit(handle, data);
  }
}

module.exports = Chat;