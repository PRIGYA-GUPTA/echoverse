import { useState } from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import { imgDB, txtDB, auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SignUp({ values, setValues, setAvatar, avatar }) {
  const navigate = useNavigate();
  const handleSubmission = () => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpload = (e, type) => {
    const file = e.target.files[0];
    const storageRef = ref(imgDB, `Imgs//${auth.currentUser.uid}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        if (type === "avatar") {
          setAvatar(url); // Set the avatar image URL
        }
      });
    });
  };
  return (
    <div className="maindivsign">
      <div className="sign">
        <div className="signincon">
          <div className="signdiv">
            <h1>Sign Up</h1>
            <label>User Name</label>
            <br></br>
            <input
              type="name"
              className="email1"
              placeholder="Enter your name"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            ></input>

            <br></br>

            <label>Display Name</label>
            <br></br>
            <input
              type="name"
              className="email1"
              placeholder="Enter your display name"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  displayname: e.target.value,
                }))
              }
            ></input>

            <label>Email</label>
            <br></br>
            <input
              type="email"
              placeholder="Enter email address"
              className="email1"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
              }
            ></input>
            <br></br>

            <label>Password</label>
            <br></br>
            <input
              type="password"
              placeholder="Enter password"
              className="email1"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, password: e.target.value }))
              }
            ></input>
            <br></br>
            <label>Avatar</label>
            <br />
            <input type="file" onChange={(e) => handleUpload(e, "avatar")} />
            <br />

            <b className="error"></b>

            <button
              className="signbutton"
              type="submit"
              onClick={handleSubmission}
            >
              Signup
            </button>

            <p style={{ color: "#fff", marginTop: "10px" }}>
              Already have an account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
