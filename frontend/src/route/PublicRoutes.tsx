import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
interface PublicRoutesProps {}

const PublicRoutes: React.FunctionComponent<PublicRoutesProps> = () => {
  const { user } = useSelector((state: RootState) => state.users);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
