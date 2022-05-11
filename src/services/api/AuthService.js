import BaseService from "./BaseService"

const ENDPOINTS = {
    REGISTER : "api/auth/register",
    LOGIN: "api/auth/login"
}

class AuthService extends BaseService{
    constructor(){
        super();
    }

    register = async () => {

    }

    login = async loginData =>{
        
        const response = await this.apiClient().post(ENDPOINTS.LOGIN,loginData);
        localStorage.setItem("token",response.data.access_token);
        localStorage.setItem("user",JSON.stringify(response.data.user));

        // uradi posle za kodove koji nisu 200
        // if(response.status="401"){

        // }
    }

    register = async registerData => {

        const response = await this.apiClient().post(ENDPOINTS.REGISTER,registerData);
        
    }

    // da li ovo ovako treba?
    getCurrentUser(){
        const user = localStorage.getItem("user");

        return user === null ? null : JSON.parse(localStorage.getItem("user"));
    }
}

const authService = new AuthService();
export default authService;