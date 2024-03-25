import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
});

// CORS 미들웨어 추가
app.use(cors({
  origin: "http://127.0.0.1:5500"
}));

// 정적 파일 제공을 위한 디렉토리 설정
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // 클라이언트로부터 메시지를 받으면 모든 클라이언트에게 그 메시지를 전달
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

export default app;