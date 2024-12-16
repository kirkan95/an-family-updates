import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import { objList } from "./utils/parsingJson";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout objList={objList} />}>
          <Route index element={<Home />} />
          {objList.map((article) => (
            <Route
              key={article.objName}
              path={article.objName}
              element={<ArticlePage article={article} />}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
