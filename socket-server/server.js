const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// ESTE ES EL SERVIDOR que tu SocketHelper necesita
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Aquí manejas las conexiones de tu SocketHelper
io.on("connection", (socket) => {
  console.log("🔌 Cliente conectado:", socket.id);

  // Escuchar eventos que tu SocketHelper emite
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`Usuario ${socket.id} se unió a sala: ${room}`);
  });

  socket.on("notificador", (data) => {
    console.log("📢 Notificación recibida:", data);
    socket.broadcast.emit("notificador", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
  });
});

server.listen(3005, () => {
  console.log("🚀 Servidor Socket.IO corriendo en puerto 3000");
});
