import axios from "axios"
import Cookies from "js-cookie";


export const API_URL = import.meta.env.VITE_API_URL;


export function getCsrfToken() {
    // const match = document.cookie.match(/(?:^|;\s*)csrf-token=([^;]+)/);
    // const match = document.cookie
    //     .split("; ")
    //     .find(item => item.startsWith(`csrf_token=`))
    // return match ? decodeURIComponent(match.split("=")[1]) : "";
        return Cookies.get('csrf_token') || "";
}

if (!API_URL) {
    throw new Error('Api url missing')
}
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const method = (config.method || 'get').toUpperCase();

    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        const csrfToken = Cookies.get('csrf_token')
        console.log(csrfToken);
        

        if (csrfToken) {
            config.headers = config.headers || {};
            config.headers["x-csrf-token"] = csrfToken
        }
    }
    return config
})

export default api

