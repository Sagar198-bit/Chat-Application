import { Route, Routes } from "react-router-dom";
import { Login, Signup, DashBoard } from "./pages/index.js";
import "./index.css";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectRoute.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { isAuthenticated } from "../store/auth.slices/AuthSlices.js";
export const App = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.Auth);
  useEffect(() => {
    if (status === "idle") {
      dispatch(isAuthenticated());
    }

    if(status === "succeeded"){
        navigate("/chats")
    }

  }, [status]);


  console.log("Auth Data: " , data , status)
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoutes/>}>
        <Route path="/chats" element={<DashBoard />} />
      </Route>
    </Routes>
  );
};
