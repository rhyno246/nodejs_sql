import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { apiUrl } from "./apiUrl";
import { getItem } from "./useLocalStorage";

enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
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
            timeout : 10000,
            headers : {
                "content-type": "application/json",
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
            break;
          }
          case StatusCode.TooManyRequests: {
            break;
          }
        }
    
        return Promise.reject(error);
      }
}
const axiosConfig = new Http().instance;
export default axiosConfig;



// import axios, { AxiosInstance } from "axios";
// import { apiUrl } from "./apiUrl";

// class Http {
//     instance : AxiosInstance 
//     constructor() {
//         this.instance = axios.create({
//             baseURL : apiUrl,
//             timeout : 10000,
//             headers : {
//                 "content-type": "application/json",
//             }
//         });
//     }
// }
// const axiosConfig = new Http().instance;
// export default axiosConfig;