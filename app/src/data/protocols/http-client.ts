export interface HttpClient<RequestBody, ResponseBody> {
    request(
        requestPayload: HttpRequestPayload<RequestBody>
    ): Promise<HttpResponse<ResponseBody>>;
}

export interface HttpRequestPayload<Body = any> {
    url: string;
    headers?: Record<string, string>;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body: Body;
}

export interface HttpResponse<Body = any> {
    headers: Headers;
    body: Body;
}
