import axios from "axios";

class HttpService{
    constructor(options={}){
        this.client = axios.create(options);
        this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
        this.client.interceptors.request.use((config) => {
            //console.log(config);
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    handleSuccessResponse(response){
        //console.log(response);
        return response;
    }

    handleErrorResponse(error) {
        return error.response;
    }
}

const options = {
    baseURL: "http://localhost:8000"
}

const httpService = new HttpService(options);

export default httpService;