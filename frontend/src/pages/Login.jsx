import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { NavLink } from "react-router-dom";
import { useState,  useCallback, useMemo } from "react";
import { useGetLogin } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Socket} from "../socket/socket.js";
export const Login = () => {
   const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const login = useGetLogin();

  const handleOnchange = useCallback((e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
   
    const { email, password } = loginDetails;

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const result = await login.mutateAsync({
        email: loginDetails.email,
        password: loginDetails.password,
      });

      //create the connection of socket
     Socket()

      setLoginDetails({ email: "", password: "" });
      navigate("/chats");
    } catch (error) {
      console.log(error);
    }
  };
  const FormData = useMemo(
    () => [
      {
        name: "email",
        type: "email",
        label: "Email Address",
        placeholder: "Enter Your Email....",
        id: "email",
        value: loginDetails.email,
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter Your Password....",
        id: "passwd",
        value: loginDetails.password,
      },
    ],
    [loginDetails],
  );

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-sans text-4xl font-extrabold tracking-tighter text-[#202d51]">
            Welcome Back
          </h1>
          <p className="font-medium">
            Please enter your details to access your chats
          </p>
        </div>

        <form className="flex flex-col gap-7">
          {FormData.map((eachFormData) => (
            <div key={eachFormData.name}>
              <Input
                type={eachFormData.type}
                label={eachFormData.label}
                id={eachFormData.id}
                name={eachFormData.name}
                placeholder={eachFormData.placeholder}
                value={eachFormData.value}
                handleOnchange={handleOnchange}
              />
            </div>
          ))}

          <div>
            <Button text="Sign In" handleFunc={handleLogin} />
          </div>
        </form>

        <div className="mt-5 text-center">
          <p className="block text-xs font-bold text-[#4e5a81] uppercase">
            New Here{" "}
            <NavLink
              className="text-primary font-bold text-[#1372c1] underline-offset-4 hover:underline"
              to="/"
            >
              Create Account
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};
