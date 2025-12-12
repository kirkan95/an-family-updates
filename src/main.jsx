import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/2024/Layout";
import Home from "./pages/2024/Home";
import ArticlePage from "./pages/2024/ArticlePage";
import MainPage from "./pages/2025/MainPage";
import { objList2025 } from "./utils/parsing2025";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Layout objList2025={objList2025} />}> */}
        <Route index element={<MainPage />} />
        {/* {objList2025.map((article) => (
            <Route
              key={article.objName}
              path={article.objName}
              element={<MainPage article={article} />}
            />
          ))} */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
