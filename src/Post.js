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
            <div>
              <h3>{displayname}</h3>
            </div>
            <div>
              <span>@{username}</span>
              {verified && <VerifiedOutlined style={{ color: "blue" }} />}
            </div>
          </div>
          <div>
            <p>{text}</p>
          </div>
        </div>
      </div>
      <div>
        {image && <img src={image} height="400px" width="600px"></img>}
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
