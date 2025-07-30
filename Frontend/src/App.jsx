import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import GoogleSuccess from './Components/GoogleSuccess';
import ResetPassword from './Components/ResetPassword';
import Register from './Components/Register';

function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Login</Link> | <Link to="/forgot-password">Forgot Password</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/register" element={<Register />} />
        <Route path="/github-success" element={<GoogleSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
