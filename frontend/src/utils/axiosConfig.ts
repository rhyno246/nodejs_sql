import axios, { AxiosInstance } from "axios";
import { apiUrl } from "./apiUrl";

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
    }
}
const axiosConfig = new Http().instance;
export default axiosConfig;