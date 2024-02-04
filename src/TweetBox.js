import { Button } from "@mui/material";
import "./TweetBox.css";
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
function TweetBox() {
  return <></>;
}

export default TweetBox;
