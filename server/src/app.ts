import express, { json, urlencoded, raw } from "express";
import cors from "cors";
import { fileUploadRouter } from "./components/file-upload/file-upload-router";
import logger from "morgan";
const app = express();

app.use(cors({ exposedHeaders: "Location", origin: "*" }));
app.use(raw({ type: "image/*", limit: "30mb" }));
app.use(json());
app.use(logger("dev"));
app.use(fileUploadRouter);
app.get("/", (req, res) => {
  res.send({ message: "ok" });
});

export default app;
