import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "./Header";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  return (
    <div className="layout">
      <Header />
      <div
        className="main"
        style={{ background: switchTheme ? "#222" : "#fff" }}
      >
        <div className="container">{children} </div>
      </div>
    </div>
  );
};

export default Layout;
