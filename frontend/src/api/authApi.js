// //post request
// import axios from "axios";
// // import { toast } from "react-toastify";
// import { queryClient } from "../main";
// import { useMutation } from "@tanstack/react-query";
// //user signup function
// export const getUserSignup = () => {
//   return useMutation({
//     mutationFn: async (url, username, useremail, userpassword) => {
//       await axios.post(url, {
//         name: username,
//         email: useremail,
//         password: userpassword,
//       });
//       onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] });
//     },
//   });

//   // try {
//   //   const result = await axios.post(url, {
//   //     name: username,
//   //     email: useremail,
//   //     password: userpassword,
//   //   });

//   //   const { message, success } = result?.data;
//   //   if (success) {
//   //     toast.success(message);
//   //   }
//   // } catch (err) {
//   //   toast.warning(err.message);
//   //   return err;
//   // }
// };

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const Signup = (data) => API.post("/signup", data).then((res) => res);
export const Login = (data) => API.post("/login", data).then((res) => res);
export const getme = () => API.get("/me").then((res) => res);
