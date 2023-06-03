import axios from "axios";

const publicRequest = axios.create({
    baseURL: 'http://localhost:5000/'
});

publicRequest.interceptors.request.use(async config => {
    config.headers["token"] = `Bearer ${localStorage.getItem("token")}`;

    return config;
});
export default publicRequest