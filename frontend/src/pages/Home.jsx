import React, { useState } from "react";
import PostCard from "../components/PostCard.jsx";
const initialPosts = [
  {
    id: 1,
    title: "Welcome Post",
    content: "Hackathon starts now!",
    author: "Admin",
  },
  {
    id: 2,
    title: "Team Update",
    content: "Our new feature is live!",
    author: "Dev Team",
  },
];

const FeedPage = () => {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 p-6 font-sans">
      <div className="home-feed-container">
        <div className="home-posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="home-post-frame">
              <PostCard
                title={post.title}
                content={post.content}
                author={post.author}
              />
              <div className="home-meta">By {post.author}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
