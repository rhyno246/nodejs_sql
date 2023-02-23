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
import NewPost from "./views/admin/NewPost";
import DetailPost from "./views/admin/DetailPost";
import Users from "./views/admin/Users";
import { ToastContainer } from "react-toastify";
import ForgotPass from "./views/client/auth/ForgotPass";
import ResetPass from "./views/client/auth/ResetPass";
import ProFile from "./views/client/user/ProFile";
import Category from "./views/admin/Category";
import Stories from "./views/admin/Stories";

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
              element={
                <ProtectedRouting
                  roleAdminRequired="admin"
                  roleContentRequired="content"
                />
              }
            >
              <Route
                path="/admin"
                element={<Navigate replace to="dashboard" />}
              />
              <Route path="dashboard" element={<DashBoard />} />

              <Route path="post">
                <Route index element={<Post />} />
                <Route path="add-new" element={<NewPost />} />
                <Route path=":postId" element={<DetailPost />} />
              </Route>

              <Route path="stories">
                <Route index element={<Stories />} />
              </Route>

              <Route path="category">
                <Route index element={<Category />} />
              </Route>

              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="login" element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="register" element={<PublicRoutes />}>
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="forgot-pass" element={<PublicRoutes />}>
              <Route path="/forgot-pass" element={<ForgotPass />} />
            </Route>

            <Route path="reset-pass" element={<PublicRoutes />}>
              <Route path="/reset-pass" index element={<ResetPass />} />
            </Route>

            <Route path="user" element={<ProtectedRouting />}>
              <Route index element={<ProFile />} />
            </Route>

            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </Paper>
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme={switchTheme ? "dark" : "light"}
      />
    </ThemeProvider>
  );
};

export default App;
