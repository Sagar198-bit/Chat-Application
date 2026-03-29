import { Input } from "../components/ui/Input";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../components/ui/Button";
import { NavLink } from "react-router-dom";
export const Signup = () => {
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
            <div>
              <Input
                type="text"
                label="Full Name"
                id={uuidv4()}
                name="username"
                placeholder="Enter Your Name....."
              />
            </div>

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
              <Button />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
