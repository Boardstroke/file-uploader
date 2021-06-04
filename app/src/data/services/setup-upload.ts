import { HttpClient, HttpResponse } from "../protocols/http-client";

export class SetupUploadHttp {
    constructor(
        private readonly httpClient: HttpClient<any, SetupUploadResponse>
    ) {}

    async execute(body: SetupUploadRequest, headers?: Record<string, string>) {
        const response = await this.httpClient.request({
            url: "/upload",
            method: "POST",
            body: JSON.stringify(body),
            headers,
        });

        return response;
    }
}

export interface SetupUploadRequest {
    filename: string;
}
export interface SetupUploadHeader {
    "X-Upload-Content-Type": string;
    "X-Upload-Content-Length": string;
}
export interface SetupUploadResponse {}
export interface SetupUploadResponseHeader {
    Location: string;
}
