import * as React from "react";
import { Outlet } from "react-router-dom";
interface AdminProps {}

const Admin: React.FunctionComponent<AdminProps> = () => {
  return <Outlet />;
};

export default Admin;
