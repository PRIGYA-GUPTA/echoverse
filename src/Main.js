import React from "react";
import logo from "./evLogo.png";
import { Button } from "@mui/material";
import "./Main.css";
import { Link } from "react-router-dom";
import SignUp from "./Signup";
import SignIn from "./Signin";
function Main() {
  return (
    <div>
      <div className="main_container">
        <div className="img_cont">
          <img className="mainimg" src={logo}></img>
        </div>
        <div className="main_content">
          <h1 className="main_head">
            What's <br></br>Happening?!
          </h1>
          <br></br>
          <h3>Echo your Verse, Join Today!</h3>
          <Link to="/signup" element={SignUp}>
            <Button variant="outlined" className="main_btn">
              Sign up
            </Button>
          </Link>

          <br></br>
          <Link to="/signin" element={SignIn}>
            <Button variant="outlined" className="main_btn">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
