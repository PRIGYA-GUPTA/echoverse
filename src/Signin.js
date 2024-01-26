import { useState, useEffect } from "react";
import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import "./Signin.css";

function SignIn({ selectedImage, setSelectedImage, values, setValues }) {
  const location = useLocation();

  const email = location.state?.email || "";
  console.log(`Received email: ${email}`);
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log(values.email);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="sign">
        <div className="signincon">
          <div className="signdiv">
            <h1>Sign In</h1>

            <input
              type="email"
              className="email1"
              placeholder="Enter email address"
              value={values.email}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
              }
            ></input>
            <input
              type="password"
              className="email1"
              placeholder="Enter password"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, password: e.target.value }))
              }
            ></input>
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
                <p>New to Netflix? </p>
                <p style={{ color: "#fff" }}></p>
              </div>
              <div className="Spandiv">
                <span>
                  This page is protected by Google reCAPTCHA to ensure you're
                  not a bot.
                </span>
                <a href="#"> Learn more.</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
