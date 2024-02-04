import { Avatar } from "@mui/material";

import "./post.css";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";

import React, { useState } from "react";
import { VerifiedOutlined } from "@mui/icons-material";

function Post({ displayname, username, verified, text, image, avatar }) {
  return (
    <div className="post">
      <div className="post__body">
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__content">
          <div className="post__header">
            <div style={{ display: "flex" }}>
              <h3>{displayname}</h3>
              <span style={{ paddingTop: "0.3rem" }}>@{username}</span>
            </div>
            <div>
              {verified && <VerifiedOutlined style={{ color: "blue" }} />}
            </div>
          </div>
          <div>
            <p className="post_text">{text}</p>
          </div>
        </div>
      </div>
      <div>
        {image && (
          <img
            src={image}
            height="400px"
            width="600px"
            style={{ objectFit: "contain" }}
          ></img>
        )}
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
