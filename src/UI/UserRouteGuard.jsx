import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Menu from "../Features/Menu/Menu";
import Home from "./Home";
import { useEffect } from "react";

function UserRouteGuard({ children }) {
  const userName = useSelector((state) => state.user.userName);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Use useEffect to check userName when the component mounts
    if (!userName && location.pathname !== "/") {
      navigate("/");
    }
  }, [userName, location.pathname]);

  return children;
}

export default UserRouteGuard;
