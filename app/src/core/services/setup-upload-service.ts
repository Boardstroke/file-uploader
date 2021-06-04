import { SetupUploadHttp } from "../../data/services/setup-upload";
import { FetchHttpClient } from "../../infra/http-client";

export const makeSetupUploadService = () => {
    const httpClient = new FetchHttpClient();
    const service = new SetupUploadHttp(httpClient);

    return service;
};
