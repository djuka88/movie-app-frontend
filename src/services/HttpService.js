import axios from "axios";
import { config } from "../config";

class HttpService{
    constructor(){
        this.httpClient = axios.create({
            baseURL: config.API_BASE_URL
        });
    }

    request = (requestConfig) => 
        this.httpClient.request(requestConfig).then(({data}) => data);

    attachHeaders = (headers) =>
        Object.assign(this.httpClient.defaults.headers,headers);

    removeHeaders = (headerKeys) => 
        headerKeys.forEach(key => delete this.httpClient.defaults.headers[key]);

    addRequestInterceptor = (callback) =>
        this.httpClient.interceptors.request.use(callback);

    removeRequestInterceptor = (interceptorId) =>
        this.httpClient.interceptors.request.eject(interceptorId);

    addResponseInterceptor = (successCallback, errorCallback) =>
        this.httpClient.interceptors.response.use(successCallback,errorCallback);

    removeResponseInterceptor = (interceptorId) => 
        this.httpClient.interceptors.response.eject(interceptorId);

    setUnauthorizedCallback = (callback) =>
        (this.unauthorizedCallback = callback)
}

const httpService = new HttpService();

export default httpService;