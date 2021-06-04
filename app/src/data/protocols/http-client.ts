export interface HttpClient<RequestBody, ResponseBody> {
    request(
        requestPayload: HttpRequestPayload<RequestBody>
    ): Promise<HttpResponse<ResponseBody>>;
}

export interface HttpRequestPayload<Body = any> {
    url: string;
    headers?: any;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body: any;
}

export interface HttpResponse<Body = any> {
    headers: any;
    body: Body;
}
