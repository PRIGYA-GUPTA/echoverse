import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./firebase";
import { v4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import logo from "./evLogo.png";
import { storage } from "./firebase";
import "./Signin.css";
function SignUp() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const displayname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const avatar = e.target[4].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(auth);
      //Create a unique image name
      // const date = new Date().getTime();
      const randomId = v4();
      const storageRef = ref(storage, `${displayname + randomId}`);
      // console.log(storageRef);

      await uploadBytesResumable(storageRef, avatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName: displayname,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayname,
              email,
              username,
              photoURL: downloadURL,
            });

            navigate("/home");
          } catch (err) {
            // console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
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
              <h1>Sign Up</h1>
              <label htmlFor="username" style={{ paddingBottom: "10px" }}>
                User Name
              </label>
              <br></br>
              <input
                type="text"
                className="email1"
                id="username"
                placeholder="Enter your name"
                required
              ></input>
              <br></br>
              <label htmlFor="displayname">Display Name</label>
              <br></br>
              <input
                type="text"
                className="email1"
                id="displayname"
                placeholder="Enter your display name"
                required
              ></input>
              <br></br>
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                className="email1"
              ></input>
              <br></br>
              <label htmlFor="password">Password</label>
              <br></br>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="email1"
              ></input>
              <br></br>
              <label htmlFor="ava">Avatar</label>
              <br />
              <input type="file" id="ava" />
              <br />
              {loading && "loading"}
              <span style={{ color: "red" }}>
                {err ? <span>Something went wrong</span> : " "}
              </span>
              <button className="signbutton" type="submit">
                Signup
              </button>

              <p style={{ color: "#fff", marginTop: "10px" }}>
                Already have an account?
                <Link to="/signin" style={{ color: "white" }}>
                  SignIn Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
