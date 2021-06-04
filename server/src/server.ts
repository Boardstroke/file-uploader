import http from "http";
import app from "./app";
import { Server } from "socket.io";
import url from "url";
import { fileProperties } from "./components/file-upload/fileProperities";

const server = http.createServer((req, res) => {
  const possiblesFilesIds = fileProperties.keys();
  const urls = [];
  for (let fileId of possiblesFilesIds) {
    urls.push(`/upload/${fileId}`);
  }
  console.log(urls);
  if (!req.url) return;
  if (urls.includes(req.url) && req.method === "PUT") {
    let data: Buffer = Buffer.from([]);
    req.on("data", (chunk: Buffer) => {
      data = Buffer.concat([data, chunk]);
      console.log(data);
      io.emit("progress", data.byteLength);
    });
    req.on("end", () => {
      res.statusCode = 201;
      res.end();
    });
  }

  app(req, res);
});
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connect", (socket) => {
  socket.emit("event", "hello");
});
server.listen(8081, () => {
  console.log("Estou ouvindo");
});
