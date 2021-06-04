import {
    HttpClient,
    HttpRequestPayload,
    HttpResponse,
} from "../data/protocols/http-client";

export class FetchHttpClient implements HttpClient<any, any> {
    async request(
        requestPayload: HttpRequestPayload<any>
    ): Promise<HttpResponse<any>> {
        const httpResponse = await fetch(
            `http://localhost:8081${requestPayload.url}`,
            {
                body: JSON.stringify(requestPayload.body),
                mode: "cors",
                method: requestPayload.method,
                headers: {
                    "Content-Type": "application/json",
                    ...requestPayload.headers,
                },
            }
        );
        return {
            body: httpResponse.body,
            headers: httpResponse.headers,
        };
    }
}
