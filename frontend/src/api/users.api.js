import {API} from "./axios.instances.js"

export const users = () => API.get("/users").then((res) => res.data)