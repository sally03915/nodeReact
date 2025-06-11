// npm install express socket.io cors

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("사용자가 연결됨:", socket.id);

    socket.on("message", (data) => {
        io.emit("message", data); // 모든 클라이언트에게 메시지 전송
    });

    socket.on("disconnect", () => {
        console.log("사용자가 연결 해제됨:", socket.id);
    });
});

server.listen(3075, () => console.log("서버 실행 중: http://localhost:3000"));

