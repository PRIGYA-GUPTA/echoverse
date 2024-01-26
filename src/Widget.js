import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import Microlink from "@microlink/react";
import SearchIcon from "@mui/icons-material/Search";
import "./widget.css";

function Widget() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search verse" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>

        <div style={{ padding: "20px" }}>
          <Microlink
            url="https://prigyaportfolio.netlify.app/"
            media="logo"
            size="large"
          />
        </div>
        <div style={{ padding: "20px" }}>
          <Microlink
            url="https://prigyanetflixs.netlify.app/"
            fetchData
            media="audio"
            size="large"
          />
        </div>

        <div style={{ padding: "20px" }}>
          <Microlink
            url="https://prigya-ahead.netlify.app/"
            media="audio"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}

export default Widget;
