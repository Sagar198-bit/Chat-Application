import { useMutation } from "@tanstack/react-query";
import { Signup, Login } from "../api/auth.api.js";

//user Signup
export const useGetSignup = () => {
  return useMutation({
    mutationFn: ({ name, email, password }) =>
      Signup({ name, email, password }),
    onSuccess: (data) => console.log(data),
  });
};

export const useGetLogin = () => {
  return useMutation({
    mutationFn: ({email, password}) => Login({email, password}),
    onSuccess: (data) => {
      return data
    }
  });
};
