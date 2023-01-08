import * as React from "react";
import "./scss/app.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/client/Home";
import News from "./views/client/News";
import NewsDetail from "./views/client/NewsDetail";
import { ThemeProvider } from "@mui/material";
import { Paper } from "@mui/material";
import { darkTheme, lightTheme } from "./utils/theme";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "./redux/store";
import Login from "./views/client/auth/Login";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./views/admin/Dashboard";
import Settings from "./views/admin/Settings";
import ProtectedRouting from "./route/ProtectedRouting";
import PublicRoutes from "./route/PublicRoutes";
import Register from "./views/client/auth/Register";
import Post from "./views/admin/Post";

interface AppProps {}
const App: React.FunctionComponent<AppProps> = () => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  return (
    <ThemeProvider theme={switchTheme ? darkTheme : lightTheme}>
      <Paper style={{ height: "100vh", borderRadius: 0 }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news">
              <Route index element={<News />} />
              <Route path=":id" element={<NewsDetail />} />
            </Route>

            <Route
              path="/admin"
              element={<ProtectedRouting roleRequired="admin" />}
            >
              <Route
                path="/admin"
                element={<Navigate replace to="dashboard" />}
              />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="post" element={<Post />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="login" element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="register" element={<PublicRoutes />}>
              <Route path="/register" element={<Register />} />
            </Route>

            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
