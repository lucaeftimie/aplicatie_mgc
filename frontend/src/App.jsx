import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import InternalChat from "./pages/InternalChat.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Gambling from "./pages/Gambling.jsx";

import ChallengesByRole from "./pages/ChallengesByRole.jsx";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/internal-chat" element={<InternalChat />} />
        <Route path="/challenges-by-role" element={<ChallengesByRole />} />
        <Route path="/gambling" element={<Gambling />} />
      </Routes>
    </Router>
  );
}

export default App;
