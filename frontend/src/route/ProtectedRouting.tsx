import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
interface ProtectedRoutingProps {
  roleAdminRequired?: string;
  roleContentRequired?: string;
}
const ProtectedRouting: React.FunctionComponent<ProtectedRoutingProps> = (
  props: ProtectedRoutingProps
) => {
  const { user } = useSelector((state: RootState) => state.users);
  if (props.roleAdminRequired || props.roleContentRequired) {
    return user ? (
      props.roleAdminRequired === user.user.role ||
      props.roleContentRequired === user.user.role ? (
        <Outlet />
      ) : (
        <Navigate to="/admin" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default ProtectedRouting;
