import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { storage } from "./firebase";
import { Avatar } from "@mui/material";
import { collection, doc, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDoc, getDocs } from "firebase/firestore";
import { v4 } from "uuid";
import { useRef } from "react";
import { Button } from "@mui/material";
import "./feed.css";
import Post from "./Post";

function Feed() {
  const [text, setText] = useState("");
  const [disImage, setDisImage] = useState("");
  const [posts, setPosts] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load posts when the component mounts
    fetchData();
  }, []);
  const uploadFile = async (e) => {
    try {
      const randomId = v4();

      const storageRef = ref(
        storage,
        `${auth.currentUser.displayName + randomId}`
      );
      // console.log(storageRef);

      await uploadBytesResumable(storageRef, disImage).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            const docRef = await addDoc(collection(db, "posttt"), {
              text: text,
              image: downloadURL,
              userId: auth.currentUser.uid,
            });
            setText("");

            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            // console.log("Document written with ID: ", docRef.id);

            fetchData();
          } catch (err) {
            // console.log(err);
          }
        });
      });
    } catch (err) {
      // console.log(err);
    }
  };

  const fetchData = async () => {
    const postSnapshot = await getDocs(collection(db, "posttt"));
    const postArray = postSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // console.log(postArray);

    const userIds = [...new Set(postArray.map((post) => post.userId))];
    // console.log("userIds:", userIds);

    const userDataPromises = userIds.map(async (userId) => {
      const userSnapshot = await getDoc(doc(db, "users", userId));
      return { userId, userData: userSnapshot.data() };
    });

    const userDataArray = await Promise.all(userDataPromises);

    // console.log(userDataArray);

    const postsWithUserData = postArray.map((post) => {
      const userData = userDataArray.find(
        (data) => data.userId === post.userId
      );
      return {
        ...post,
        userData: userData,
      };
    });

    // console.log(postsWithUserData, "i am postswithuser");
    setPosts(postsWithUserData);
  };

  return (
    <div className="feed">
      <header className="feed__header ">
        <h2>Home</h2>
      </header>

      <div className="tweetBox">
        <form>
          <div className="tweetBox__input">
            <div>
              <Avatar src={auth.currentUser.photoURL} />

              <br />
            </div>

            <input
              type="text"
              placeholder="What is happening ?!"
              style={{ textDecoration: "none" }}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></input>
          </div>

          <input
            type="file"
            placeholder="Optional"
            className="tweetBox__imageInput"
            ref={fileInputRef}
            onChange={(e) => setDisImage(e.target.files[0])}
          ></input>
          <Button className="tweetBox__tweetButton" onClick={uploadFile}>
            Echo
          </Button>
        </form>
      </div>
      <div>
       
        {posts.map((post) => (
          <Post
            username={post.userData.userData.username}
            displayname={post.userData.userData.displayname}
            text={post.text}
            image={post.image}
            avatar={post.userData.userData.photoURL}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
