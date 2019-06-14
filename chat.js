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

        socket.on('JoinRoom', data => {
          socket.join(data.room)
        });

        socket.on('privateChat', data => {
          const { room, name, message } = data;
          socket.to(room).emit('privateChat', { name, message });
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