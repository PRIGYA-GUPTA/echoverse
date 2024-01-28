import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import logo from "./evLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { query, collection, where, getDocs } from "firebase/firestore";
import { txtDB } from "./firebase"; // Import your Firestore instance

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import "./Signin.css";

function SignIn({ selectedImage, setSelectedImage, values, setValues }) {
  const location = useLocation();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const email = location.state?.email || "";

  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log(values.email);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setIsAuthenticated(true);
        navigate("/home");
      })
      .catch((err) => {
        setErrorMsg(err.message);
        // console.log(err);
      });
  };

  // const handleSubmit = async () => {
  //   try {
  //     const res = await signInWithEmailAndPassword(
  //       auth,
  //       values.email,
  //       values.password
  //     );
  //     const user = res.user;

  //     // Fetch additional user data from Firestore based on email
  //     const userQuery = query(
  //       collection(txtDB, "users"),
  //       where("email", "==", values.email)
  //     );
  //     const userSnapshot = await getDocs(userQuery);

  //     if (userSnapshot.size > 0) {
  //       // Assuming there's only one user with a given email
  //       const userData = userSnapshot.docs[0].data();
  //       console.log("User Data from Firestore:", userData);

  //       // You can set the user data in your state or context for further use
  //       // For example, if using React state:
  //       setValues((prev) => ({
  //         ...prev,
  //         username: userData.username,
  //         displayname: userData.displayname,
  //         avatar: userData.avatar,
  //       }));
  //     }

  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <div className="maindivsign">
      <img
        src={logo}
        className="sidebar__evIcon"
        style={{ marginTop: "1rem" }}
      ></img>
      <div className="sign">
        <div className="signincon">
          <div className="signdiv">
            <h1>Sign In</h1>
            <br></br>
            <label>Email</label>
            <br></br>
            <input
              type="email"
              className="email1"
              placeholder="Enter email address"
              value={values.email}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
              }
            ></input>
            <br></br>
            <label>Password</label>
            <br></br>
            <input
              type="password"
              className="email1"
              placeholder="Enter password"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, password: e.target.value }))
              }
            ></input>
            <span style={{ color: "red" }}>
              {errorMsg ? <span>{errorMsg}</span> : " "}
            </span>
            {/* {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={"40px"}
                  style={{ borderRadius: "50%" }}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />

                <button onClick={() => setSelectedImage(null)}>Reset</button>
              </div>
            )}

            <br />
            <br /> */}
            {/* 
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            /> */}
            {/* <div
              className="divsign1"
              onClick={handleSubmit}
              disable={submitdisable}
            >
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "white" }}
              >
                <span className="signin1">Sign In</span>
              </Link>
            </div> */}
            <b className="error"></b>

            <button className="signbutton" type="submit" onClick={handleSubmit}>
              Signin
            </button>

            <div className="checkdiv">
              <div className="checkRem">
                <div>
                  <input type="checkbox"></input>
                  <label>Remember me</label>
                </div>
                <div>
                  <p>Need help?</p>
                </div>
              </div>
              <div className="netdiv">
                <p>New to EchoVerse? </p>
                <Link to="/signup" style={{ color: "white" }}>
                  SignUp Now
                </Link>
                <p style={{ color: "#fff" }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
