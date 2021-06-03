import {Router} from 'express';
import { setupUpload, upload } from './controller';

export const fileUploadRouter = Router();

fileUploadRouter.post('/upload', setupUpload)
fileUploadRouter.put("/upload/:fileId", upload)
