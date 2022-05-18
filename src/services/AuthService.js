import httpService from "./HttpService";
import jwt_decode from "jwt-decode";
import { HTTP_METHODS, HTTP_STATUS_CODES, endpoints } from "../constants";
import { getItem, setItem, removeItem } from "../utils/localStorage";

class AuthService {
  httpService = httpService;

  constructor() {
    this.init();
  }

  init = () => {
    this.setAccessToken(this.getAccessToken());
    this.httpService.addRequestInterceptor(this.checkTokenExpiration);
    this.httpService.addResponseInterceptor(
      this.handleSuccessResponse,
      this.handleErrorResponse
    );
  };

  register = async ({
    firstName: name,
    email,
    password,
    confirmPassword: password_confirmation,
  }) => {
    await this.httpService.request({
      url: endpoints.REGISTER,
      method: HTTP_METHODS.POST,
      data: { name, email, password, password_confirmation },
    });
  };

  setAccessToken = (token) => {
    if (token) {
      setItem("access_token", token);

      this.httpService.attachHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
  };

  getAccessToken = () => getItem("access_token");

  checkTokenExpiration = async (request) => {
    if (request.url === endpoints.TOKEN_REFRESH) {
      return request;
    }

    const token = this.getAccessToken();

    if (token && Date.now() / 1000 >= jwt_decode(token).exp) {
      const newToken = await this.refreshToken(token);
      request.headers.Authorization = `Bearer ${newToken}`;

      return request;
    }

    return request;
  };

  refreshToken = async (old_token) => {
    const { access_token: newToken } = await this.httpService.request({
      url: endpoints.TOKEN_REFRESH,
      method: HTTP_METHODS.POST,
    });

    this.setAccessToken(newToken);

    return newToken;
  };

  login = async (data) => {
    const loginData = await this.httpService.request({
      url: endpoints.LOGIN,
      method: HTTP_METHODS.POST,
      data: data,
    });
    this.setAccessToken(loginData.access_token);
    return loginData;
  };

  getCurrentUser() {
    const user = localStorage.getItem("user");

    return user === null ? null : JSON.parse(localStorage.getItem("user"));
  }

  getAccessToken() {
    const token = localStorage.getItem("token");

    return token;
  }

  fetchAuthenticatedUser = async () => {
    return this.httpService.request({
      url: endpoints.ME,
      method: HTTP_METHODS.POST,
    });
  };

  logout = async () => this.destroySession();

  destroySession = () => {
    removeItem("access_token");
    this.httpService.removeHeaders(["Authorization"]);
  };

  handleSuccessResponse = (response) => response;

  handleErrorResponse = (error) => {
    try {
      const { status } = error.response;

      switch (status) {
        case HTTP_STATUS_CODES.UNAUTHORIZED:
          this.destroySession();
          break;
      }

      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(error);
    }
  };
}

const authService = new AuthService();
export default authService;
