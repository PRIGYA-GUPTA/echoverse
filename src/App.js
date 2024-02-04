import "./App.css";

import Feed from "./Feed";
import Sidebar from "./Sidebar";
import SignIn from "./Signin";
import SignUp from "./Signup";
import Widget from "./Widget";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./Main";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <div className="app">
                  <Sidebar />
                  <Feed />
                  <Widget />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
