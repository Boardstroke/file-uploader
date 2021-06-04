import { HttpClient } from "../protocols/http-client";

export class HttpUpload {
    constructor(private readonly httpClient: HttpClient<any, UploadResponse>) {}

    async execute(url: string, body: any, headers: UploadRequestHeaders) {
        const response = await this.httpClient.request({
            body: body,
            method: "PUT",
            url,
            headers,
        });

        return response;
    }
}

export interface UploadRequestBody {}

export interface UploadRequestHeaders {
    "Content-Type": string;
    "Content-Length": string;
}

export interface UploadResponse {}
