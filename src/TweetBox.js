import { Avatar, Button } from "@mui/material";
import "./TweetBox.css";
import Post from "./Post";
import image1 from "./prigya.jpg";
import { v4 } from "uuid";
import { imgDB, txtDB, auth } from "./firebase";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
function TweetBox({
  values,
  setValues,
  selectedImage,
  setSelectedImage,
  avatar,
  data,
  setData,
}) {
  const [img, setImg] = useState("");

  const handleUpload = (e, type) => {
    const file = e.target.files[0];
    const storageRef = ref(imgDB, `Imgs//${auth.currentUser.uid}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImg(url); // Set the profile image URL
      });
    });
  };

  const handleClick = async () => {
    const valRef = collection(txtDB, "txtData");
    await addDoc(valRef, {
      txtVal: values.text,
      imgURL: img,
      displayname: values.displayname,
      username: values.username,
      avatarURL: avatar,
    });
    alert("Data added successfully");
  };
  // useEffect(() => {
  //   const addPost = async () => {
  //     try {
  //       // Convert the File object to a URL or base64-encoded string
  //       // const imageUrl = await uploadImageToStorage(selectedImage);
  //       // console.log("tweet ki iamge" + imageUrl);
  //       // Add the post data to Firestore with the converted image URL
  //       {
  //         console.log("tweet k sath" + values.displayname);
  //       }
  //       const docRef = await addDoc(collection(db, "posts"), {
  //         displayname: values.displayname,
  //         username: values.displayname,
  //         verified: values.verified,
  //         text: values.text,
  //         avatar:
  //           "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (error) {
  //       console.error("Error adding document:", error);
  //     }
  //   };

  //   if (selectedImage) {
  //     addPost();
  //   }
  // }, [selectedImage]);

  // {
  //   console.log("tweet k dusra" + values.username);
  // }
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <img
            src={image1}
            alt="hhh"
            style={{ width: "30px", borderRadius: "50%" }}
          ></img>
          {selectedImage && (
            <div>
              <img
                alt="not found"
                width={"30px"}
                style={{ borderRadius: "50%" }}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
            </div>
          )}

          <input
            type="text"
            placeholder="What is happening ?!"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, text: e.target.value }))
            }
          ></input>
        </div>

        <input
          type="file"
          placeholder="Optional"
          className="tweetBox__imageInput"
          onChange={(e) => handleUpload(e, "profile")}
        ></input>
        <Button className="tweetBox__tweetButton" onClick={handleClick}>
          Echo
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;