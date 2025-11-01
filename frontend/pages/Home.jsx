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
  // 'posts' holds the current data. 'setPosts' is the function to update it.
  const [posts, setPosts] = useState(initialPosts);

  // You would use setPosts later to add more posts:
  // const loadMore = () => {
  //   setPosts(prevPosts => [...prevPosts, ...newlyFetchedPosts]);
  // };

  return (
    <div className="feed-container">
      <h1>Company Feed</h1>
      {posts.map((post) => (
        // Pass post data to PostCard via props
        <PostCard
          key={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
        />
      ))}
      {/* <button onClick={loadMore}>Load More</button> */}
    </div>
  );
};

export default FeedPage;
