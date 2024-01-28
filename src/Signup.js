import { useState } from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import logo from "./evLogo.png";
import { imgDB, txtDB, auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Ensure you import these functions

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SignUp({ values, setValues, setAvatar, avatar }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  // const handleSubmission = async () => {
  //   try {
  //     const res = await createUserWithEmailAndPassword(
  //       auth,
  //       values.email,
  //       values.password
  //     );
  //     const user = res.user;

  //     // Update user profile with additional information
  //     await updateProfile(user, {
  //       displayName: values.displayname,
  //       photoURL: avatar,
  //     });

  //     // Save additional user information to Firestore
  //     const userRef = collection(txtDB, "users"); // Reference to the 'users' collection
  //     await addDoc(userRef, {
  //       userId: user.uid,
  //       email: values.email,
  //       username: values.username,
  //       displayname: values.displayname,
  //       avatar: avatar,
  //     });

  //     navigate("/signin");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };//baad
  const handleSubmission = () => {
    console.log(values.username, values.displayname, avatar);
    if (!values.username || !values.displayname || !avatar) {
      setErrorMsg("Please fill all the fields");
      return; // Do not proceed with signup if any field is empty
    }
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: values.displayname,
        });

        handleClick();

        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // Reset error message to null after signing up (success or failure)
        setErrorMsg(null);
        setAvatar(null);
        setValues((prev) => ({
          ...prev,
          username: null,
          displayname: null,
        }));
      });

    // } else {
    //   setErrorMsg("Please fill all the fields");
    // }
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

  const handleClick = async () => {
    const valRef = collection(txtDB, "users");
    await addDoc(valRef, {
      email: values.email,
      displayname: values.displayname,
      username: values.username,
      avatarURL: avatar,
    });
  };

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
            <h1>Sign Up</h1>
            <label>User Name</label>
            <br></br>
            <input
              type="text"
              className="email1"
              placeholder="Enter your name"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              required
            ></input>
            <br></br>
            <label>Display Name</label>
            <br></br>
            <input
              type="text"
              className="email1"
              placeholder="Enter your display name"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  displayname: e.target.value,
                }))
              }
              required
            ></input>
            <br></br>
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
            <span style={{ color: "red" }}>
              {errorMsg ? <span>{errorMsg}</span> : " "}
            </span>
            <button
              className="signbutton"
              type="submit"
              onClick={handleSubmission}
            >
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
    </div>
  );
}

export default SignUp;
