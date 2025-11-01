import React from "react";

const PostCard = (props) => {
  return (
    <div className="post-card">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      <small>Posted by : {props.author}</small>
    </div>
  );
};

export default PostCard;
