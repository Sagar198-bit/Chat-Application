import { Input } from "../components/ui/Input";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../components/ui/Button";
import { NavLink } from "react-router-dom";
export const Login = () => {
  return (
    <section className="flex min-h-screen bg-gray-200 items-center justify-center">
      <div className=" bg-white rounded-3xl shadow-2xl p-10">
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-sans text-4xl font-extrabold tracking-tighter text-[#202d51]">
            Welcome Back
          </h1>
          <p className="font-medium">
            Please enter your details to access your chats
          </p>
        </div>
        <div>
          <form className="flex flex-col gap-7">
            {/* <div>
              <Input
                type="text"
                label="Full Name"
                id={uuidv4()}
                name="username"
                placeholder="Enter Your Name....."
              />
            </div> */}

            <div>
              <Input
                type="email"
                label="Email Address"
                id={uuidv4()}
                name="email"
                placeholder="Enter Your Email....."
              />
            </div>

            <div>
              <Input
                type="password"
                label="Password"
                id={uuidv4()}
                name="password"
                placeholder="Enter Your Password....."
              />
            </div>
            <div>
              <Button text="Sign In" />
            </div>
          </form>
        </div>
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
