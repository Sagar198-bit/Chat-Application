import {API} from "../api/axios.instances.js"

export const Signup = (data) => API.post("/auth/signup", data).then((res) => res);
export const Login = (data) => API.post("/auth/login", data).then((res) => res);
export const getme = () => API.get("/auth/me").then((res) => res);
