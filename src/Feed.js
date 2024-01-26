import "./feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { v4 } from "uuid";
import { imgDB, txtDB } from "./firebase";
import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useState, useEffect } from "react";

function Feed({ values, setValues, selectedImage, setSelectedImage, avatar }) {
  const [posts, setPost] = useState([]);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   {
  //     const docRef = addDoc(collection(db, "posts"), {
  //       displayname: "newwwwee",
  //       username: "naya addd kiya",
  //       image: selectedImage,
  //     });
  //   }
  // }, []);
  // {
  //   console.log("feed k sath" + values.displayname);
  // }
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       // Get all documents from the "posts" collection
  //       const querySnapshot = await getDocs(collection(db, "posts"));

  //       // Update the state with the data from the fetched documents
  //       setPost(querySnapshot.docs.map((doc) => doc.data()));
  //     } catch (error) {
  //       console.error("Error getting documents:", error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const getData = async () => {
    const valRef = collection(txtDB, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    console.log(dataDb);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data, "datadata");

  return (
    <div className="feed">
      <header className="feed__header ">
        <h2>Home</h2>
      </header>

      <TweetBox
        values={values}
        setValues={setValues}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        avatar={avatar}
        data={data}
        setData={setData}
      />

      {data.map((post) => (
        <Post
          displayname={post.displayname}
          username={post.username}
          verified={post.verified}
          text={post.txtVal}
          avatar={post.avatarURL}
          image={post.imgURL}
        />
      ))}
    </div>
  );
}

export default Feed;
