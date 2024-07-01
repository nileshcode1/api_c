import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavBar from "./components/Navbar";
import { AppStateProvider } from "./models/Data";

const App: React.FC = () => {
  return (
    <AppStateProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AppStateProvider>
  );
};

export default App;
