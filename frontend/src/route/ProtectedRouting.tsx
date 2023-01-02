import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
interface ProtectedRoutingProps {
  roleRequired: "admin" | "content";
}
const ProtectedRouting: React.FunctionComponent<ProtectedRoutingProps> = (
  props: ProtectedRoutingProps
) => {
  const { user } = useSelector((state: RootState) => state.users);
  if (props.roleRequired) {
    return user ? (
      props.roleRequired === user.user.role ? (
        <Outlet />
      ) : (
        <Navigate to="/about" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default ProtectedRouting;
