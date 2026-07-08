import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader";

export const ProtectedRoutes = () => {
  //   const data = useSelector((state) => state.Auth.data);

  const { data, status } = useSelector((state) => state.Auth);

  console.log('Data: ' , data)

  if (status === "idle" || status === "loading") {
    return <Loader/>
  }

  console.log("Auth State:", { data, status });
  return status === "succeeded" ? <Outlet /> : <Navigate to="/login" replace />;
};
