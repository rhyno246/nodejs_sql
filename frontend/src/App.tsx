import * as React from "react";
import "./scss/app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/client/Home";
import About from "./views/client/About";
import News from "./views/client/News";
import NewsDetail from "./views/client/NewsDetail";

interface AppProps {}
const App: React.FunctionComponent<AppProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/news">
          <Route index element={<News />} />
          <Route path=":id" element={<NewsDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
