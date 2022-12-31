import * as React from "react";
import "./scss/app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/client/Home";
import About from "./views/client/About";
import News from "./views/client/News";
import NewsDetail from "./views/client/NewsDetail";
import { ThemeProvider } from "@mui/material";
import { Paper } from "@mui/material";
import { darkTheme, lightTheme } from "./utils/theme";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "./redux/store";
import Login from "./views/client/auth/Login";
import "react-toastify/dist/ReactToastify.css";

interface AppProps {}
const App: React.FunctionComponent<AppProps> = () => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  return (
    <ThemeProvider theme={switchTheme ? darkTheme : lightTheme}>
      <Paper style={{ height: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news">
              <Route index element={<News />} />
              <Route path=":id" element={<NewsDetail />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
