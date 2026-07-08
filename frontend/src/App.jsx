import { Route, Routes } from "react-router-dom";
import { Login, Signup, DashBoard } from "./pages/index.js";
import "./index.css";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectRoute.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated } from "../store/AuthSlices/AuthSlices.js";
export const App = () => {

  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.Auth);
  useEffect(() => {
    if (status === "idle") {
      dispatch(isAuthenticated());
    }

  }, []);


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
