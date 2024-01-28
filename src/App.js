import "./App.css";
import { useState, useEffect } from "react";
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setuserName] = useState("");
  const [displayname, setdisplayName] = useState("");
  const [img, setImg] = useState("");
  const [avatar, setAvatar] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
    displayname: "",
    avatar: "",
    text: "",
    verified: true,
    image: "",
  });
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={
              <SignUp
                values={values}
                setValues={setValues}
                avatar={avatar}
                setAvatar={setAvatar}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                values={values}
                setValues={setValues}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <div className="app">
                  <Sidebar />
                  <Feed
                    values={values}
                    setValues={setValues}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    avatar={avatar}
                  />
                  <Widget />
                </div>
              </ProtectedRoute>
            }
          />
          {/* <div className="app">
          <Sidebar />

          <Feed
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            username={username}
            setuserName={setuserName}
          />
          <Widget />
        </div>
        <SignUp username={username} setuserName={setuserName} />;
        <SignIn
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
