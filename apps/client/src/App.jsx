import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";   // Ensure this is imported only once
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import './index.css';

function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    // </Router>
  );
}

export default App;
