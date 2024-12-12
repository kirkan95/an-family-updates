import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import { objList } from "./utils/parsingJson";
import { useState } from "react";
import { phrase } from "./content/constants";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === phrase) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 className="rock-salt-regular headline">Enter Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <button onClick={handleLogin} autoFocus>
          Submit
        </button>
      </div>
    );
  }

  return (
    <div>Welcome!</div>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Layout objList={objList} />}>
    //       <Route index element={<Home />} />
    //       {objList.map((article) => (
    //         <Route
    //           key={article.objName}
    //           path={article.objName}
    //           element={<ArticlePage article={article} />}
    //         />
    //       ))}
    //     </Route>
    //   </Routes>
    // </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
