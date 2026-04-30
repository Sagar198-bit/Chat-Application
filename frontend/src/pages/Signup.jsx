import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useGetSignup } from "../hooks/useAuth";
export const Signup = () => {
  const Signup = useGetSignup();
  const [SignupDetails, setSignupDetails] = useState({
    username: "",
    useremail: "",
    userpassword: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, useremail, userpassword } = SignupDetails;

    if (!username.trim() || !useremail.trim() || !userpassword.trim()) {
      toast.error("All fields are required");
      return;
    }
    //post request for signup......
    try {
      const data = await Signup.mutateAsync({
        name: username,
        email: useremail,
        password: userpassword,
      });

      if (data.success) {
        toast.success(data.message);
      }

      setSignupDetails({ username: "", useremail: "", userpassword: "" });
    } catch (error) {
      toast.error(error.message);
      setSignupDetails({ username: "", useremail: "", userpassword: "" });
    }
  };
  const handleOnchange = useCallback((event) => {
    const { name, value } = event.target;

    setSignupDetails((previous) => ({ ...previous, [name]: value }));
  }, []);

  const FormData = useMemo(
    () => [
      {
        type: "text",
        label: "Full Name",
        id: "full-name",
        name: "username",
        placeholder: "Enter Your Name.....",
        value: SignupDetails.username,
      },
      {
        type: "email",
        label: "Email Address",
        id: "email",
        name: "useremail",
        placeholder: "Enter Your Email.....",
        value: SignupDetails.useremail,
      },
      {
        type: "password",
        label: "Password",
        id: "passswd",
        name: "userpassword",
        placeholder: "Enter Your Password.....",
        value: SignupDetails.userpassword,
      },
    ],
    [SignupDetails],
  );
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-sans text-4xl font-extrabold tracking-tighter text-[#202d51]">
            Create your account
          </h1>
          <p className="font-medium">
            Join the chat. Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-primary font-bold text-[#1372c1] underline-offset-4 hover:underline"
            >
              Login Here
            </NavLink>
          </p>
        </div>
        <div>
          <form className="flex flex-col gap-7">
            {FormData.map((eachForm) => (
              <div key={eachForm.name}>
                <Input
                  type={eachForm.type}
                  label={eachForm.label}
                  id={eachForm.id}
                  value={eachForm.value}
                  name={eachForm.name}
                  placeholder={eachForm.placeholder}
                  handleOnchange={handleOnchange}
                />
              </div>
            ))}
            <div>
              <Button
                handleFunc={handleSignup}
                loading={Signup.isPending}
              />{" "}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
