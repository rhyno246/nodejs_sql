import * as React from "react";
import Header from "./Header";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Header />
      <div className="main">
        <div className="container">{children} </div>
      </div>
    </div>
  );
};

export default Layout;
