import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { fileProperties } from "./fileProperities";
import fs, { createReadStream } from "fs";
export function setupUpload(req: Request, res: Response) {
  const fileId = randomUUID();
  const type = req.header("x-upload-content-type");
  const size = req.header("x-upload-content-size");
  if (!type || !size) {
    return res.status(400).send({
      message: "please, provide type and size of a file",
    });
  }

  const { filename } = req.body;
  if (!filename) {
    return res.status(400).send({
      message: "please provide the filename",
    });
  }

  fileProperties.set(fileId, {
    contentType: type,
    contentLength: size,
    filename,
  });
  console.log(fileId);
  res.setHeader("Location", `/upload/${fileId}`).status(200).send(req.body);
}

export function upload(req: Request, res: Response) {
  res.status(200).end();
}

export function uploadStatus(req: Request, res: Response) {}
