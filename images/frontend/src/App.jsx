import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Login from "./components/login/Login";
import Create from "./components/create/Create";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Specific from "./components/specific/Specific";

import "./App.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/specific" element={<Specific />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
