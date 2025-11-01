import React from "react";

const PostCard = ({ title, content, author, date, avatarUrl }) => {
  return (
    <div className="postcard">
      {/* Header cu user info */}
      <div className="postcard-header">
        <img
          src={avatarUrl || "https://i.pravatar.cc/40"}
          alt={author}
          className="postcard-avatar"
        />
        <div>
          <h4 className="postcard-author">{author}</h4>
          <p className="postcard-date">{date || "Just now"}</p>
        </div>
      </div>

      {/* Titlu postare */}
      {title && <h3 className="postcard-title">{title}</h3>}

      {/* Conținut */}
      <p className="postcard-content">{content}</p>

      {/* Footer cu reacții */}
      <div className="postcard-footer">
        <div className="postcard-actions">
          <button className="postcard-action">👍 Like</button>
          <button className="postcard-action">💬 Comment</button>
          <button className="postcard-action">🏅 Kudos</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
