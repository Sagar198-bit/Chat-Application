import { Route, Routes } from "react-router-dom";
import { Login, Signup, DashBoard } from "./pages/index.js";
import "./index.css";
// import { getme } from "./api/authApi.js";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated } from "../store/AuthSlices/AuthSlices.js";
// import { get } from "mongoose";
import { getme } from "./api/authApi.js";
export const App = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const user = await fetch("http://localhost:8000/api/v1/auth/me", {
  //         credentials : 'include'
  //       })
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  //   fetchData();
  // }, []);


  const dispatch = useDispatch()
  const {data , status} = useSelector(state => state.Auth)
  useEffect(() => {
    if(status === 'idle'){
      dispatch(isAuthenticated())
    }
  })

  // console.log(data)
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chats" element={<DashBoard />} />
    </Routes>
  );
};
