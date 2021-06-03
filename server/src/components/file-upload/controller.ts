import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { fileProperties } from "./fileProperities";
import fs, { createReadStream } from "fs";
export function setupUpload(req: Request, res: Response){
    const fileId = randomUUID();
    const header = req.header;
    const contentLength = header("x-content-length");
    const contentType = header("x-content-length");  
    let filename = req.body.filename
    const caption = req.body.caption;
    
    if(!contentLength || !contentType){
        return res.sendStatus(400).send({
            message: "Não foi possivel criar sessão"
        }).end()
    }

    if(!filename) filename = fileId

    

    fileProperties.set(fileId, {contentLength, contentType, filename, caption})
}

export function upload(req: Request, res: Response){
    const {fileId} = req.params
    const filePayload = fileProperties.get(fileId);
    // const buffer = req.body as Buffer
    req.on("data", (chunk) => {
        console.log(chunk)
    })
    // fs.writeFile(`./uploads/teste.jpg`, buffer, () => {
    //     console.log("pronto")
    // })
    
    res.status(200).end();
}

export function uploadStatus(req: Request, res: Response){
    
}