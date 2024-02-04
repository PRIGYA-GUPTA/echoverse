import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from "./evLogo.png";
import { auth } from "./firebase";
import "./Signin.css";

function SignIn() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(auth.currentUser);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="maindivsign">
      <img
        src={logo}
        className="sidebar__evIcon"
        style={{ marginTop: "1rem" }}
      ></img>
      <form onSubmit={handleSubmit}>
        <div className="sign">
          <div className="signincon">
            <div className="signdiv">
              <h1>Sign In</h1>
              <br></br>
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                type="email"
                id="email"
                className="email1"
                placeholder="Enter email address"
              ></input>
              <br></br>
              <label htmlFor="password">Password</label>
              <br></br>
              <input
                type="password"
                className="email1"
                id="password"
                placeholder="Enter password"
              ></input>
              <span style={{ color: "red" }}>
                {err ? <span>{err}</span> : " "}
              </span>

              <button className="signbutton" type="submit">
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
      </form>
    </div>
  );
}

export default SignIn;
