import "./App.css";
import { useState, useEffect } from "react";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import SignIn from "./Signin";
import SignUp from "./Signup";
import Widget from "./Widget";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
    <Router>
      <Routes>
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
          path="/"
          element={
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
  );
}

export default App;
