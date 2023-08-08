import React from "react";
import { Toolbar } from "@mui/material";
import { Helmet } from "react-helmet";

const ChatLayout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>
        <title>{title}</title>
      </Helmet>

      <div style={{ height: "100vh", background: "#dcdcdc" }}>
        <div
          style={{ background: "#00A884", height: "125px", boxShadow: "none" }}
        >
          <Toolbar>{children}</Toolbar>
        </div>
      </div>
    </div>
  );
};

ChatLayout.defaultProps = {
  title: "WhatsApp",
  description: "Fullstack final project",
  keywords: "React,Redux,Mongodb,NodeJs,ExpressJs",
  author: "Roy Atali",
};

export default ChatLayout;
