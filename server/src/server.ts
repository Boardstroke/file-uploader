import http from "http";
import app from "./app";
import { Server } from "socket.io";


const server = http.createServer((req, res) => {
  if (req.url === "/upload/teste" && req.method === "PUT") {
    let data: Buffer = Buffer.from([]);
    req.on("data", (chunk: Buffer) => {
      data = Buffer.concat([data, chunk]);
      io.emit("progress", data.byteLength);
    });
    req.on("end", () => {
      res.end();
    });
  }

  app(req, res);
});
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
io.on("connect", (socket) => {
    socket.emit('event', "hello")
})
server.listen(8081, () => {
  console.log("Estou ouvindo");
});
