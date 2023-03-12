import * as React from "react";
import { Link } from "react-router-dom";
interface NotFoundProps {}

const NotFound: React.FunctionComponent<NotFoundProps> = () => {
  return (
    <div className="not-found">
      <h1>Page Not Found</h1>
      <Link to="/">Go To Home Page</Link>
    </div>
  );
};

export default NotFound;
