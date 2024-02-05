// App component
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Body from "./components/content/ProjectContent";
import MyProjects from "./components/content/MyProjects";
import PageNotFound from "./components/handler/PageNotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />}>
            {/* Nested route */}
            <Route path="/home" element={<MyProjects />} />
            <Route path="/home/project/:id/" element={<Body />} />
          </Route>
          <Route path="*" element={<PageNotFound message="Page not found" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
