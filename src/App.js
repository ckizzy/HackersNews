import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import NewsPosts from "./components/NewsPosts";
import Home from "./pages/Home";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/:page" element={<NewsPosts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
