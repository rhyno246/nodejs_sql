import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { apiUrl } from "./apiUrl";
import { getItem } from "../../utils/useLocalStorage";
import { LogoutUser } from "../reducer/users.slice";
import { store } from "../store";
enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
    Conflict = 409
}
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    try {
      const user = getItem('user');
      if (user?.token != null) {
        config.headers.Authorization = `Bearer ${user?.token}`;
      }
      return config;
    } catch (error) {
      throw new Error(error);
    }
};


class Http {
    instance : AxiosInstance 
    constructor() {
        this.instance = axios.create({
            baseURL : apiUrl,
            headers : {
              contentType: "application/json",
            }
        });
        this.instance.interceptors.request.use(injectToken, (error) => Promise.reject(error));
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
              const { response } = error;
              return this.handleError(response);
            }
        );
    }
    private handleError(error : any) {
        const { status } = error;
        switch (status) {
          case StatusCode.InternalServerError: {
            break;
          }
          case StatusCode.Forbidden: {
            break;
          }
          case StatusCode.Unauthorized: {
            store.dispatch(LogoutUser())
            break;
          }
          case StatusCode.TooManyRequests: {
            break;
          }
          case StatusCode.Conflict : {
            break;
          }
        }
    
        return Promise.reject(error);
      }
}
const axiosConfig = new Http().instance;
export default axiosConfig;

