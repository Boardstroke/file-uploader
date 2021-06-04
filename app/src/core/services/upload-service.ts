import { HttpUpload } from "../../data/services/upload";
import { FetchHttpClient } from "../../infra/http-client";

export const makeUploadService = () => {
    const httpClient = new FetchHttpClient();
    const uploadService = new HttpUpload(httpClient);

    return uploadService;
};
