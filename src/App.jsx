import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard2";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import { SocketProvider } from "./socket/socketContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <SocketProvider>
                  <Dashboard />
                  <Toaster />
                </SocketProvider>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
