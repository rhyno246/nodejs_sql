import * as React from "react";
import MetaData from "./Metadata";
import Header from "./Header";
interface LayoutProps {
  children: any;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  return (
    <div className="layout-admin">
      <MetaData title="Admin Panel" />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
