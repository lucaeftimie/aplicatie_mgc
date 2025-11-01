// src/pages/Profile.jsx
import React, { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [posts, setPosts] = useState([
    {
      author: "Ioana Popescu",
      role: "Frontend Developer",
      text: "Lansăm astăzi noul dashboard pentru clienți!",
      image: "",
    },
    {
      author: "Andrei Ionescu",
      role: "Backend Developer",
      text: "Am finalizat integrarea API-ului de plată. Totul funcționează perfect.",
      image: "https://via.placeholder.com/400x200?text=API+Integration",
    },
    {
      author: "Maria Georgescu",
      role: "UI/UX Designer",
      text: "Am terminat design-ul pentru pagina de profil a angajaților.",
      image: "",
    },
  ]);

  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState("");

  const user = {
    name: "Ioana Popescu",
    company: "TechCorp",
    bio: "Frontend developer passionate about React and modern web apps.",
    stats: {
      posts: posts.filter((p) => p.author === "Ioana Popescu").length,
      followers: 120,
      following: 80,
    },
    loggedIn: true, // Dacă false → arată icon anonim
  };

  const addPost = () => {
    if (newPostText.trim() !== "") {
      const post = {
        author: user.name,
        role: "Frontend Developer",
        text: newPostText,
        image: newPostImage,
      };
      setPosts([post, ...posts]);
      setNewPostText("");
      setNewPostImage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header profil angajat */}
      <div className="border-b pb-4 flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-white">
          {user.loggedIn ? user.name[0] : "?"}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.company}</p>
          <p className="mt-2 text-gray-700">{user.bio}</p>
        </div>
      </div>

      {/* Statistici */}
      <div className="flex space-x-6 border-b pb-4">
        <div>
          <span className="font-bold">{user.stats.posts}</span> Posts
        </div>
        <div>
          <span className="font-bold">{user.stats.followers}</span> Followers
        </div>
        <div>
          <span className="font-bold">{user.stats.following}</span> Following
        </div>
      </div>

      {/* Adăugare postare */}
      <div className="border-b pb-4 space-y-2">
        <h2 className="text-2xl font-semibold">Create a new post</h2>
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="What's on your mind?"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          className="w-full p-2 border rounded"
          value={newPostImage}
          onChange={(e) => setNewPostImage(e.target.value)}
        />
        <button
          onClick={addPost}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      {/* Feed companie */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Company Feed</h2>
        {posts.map((post, idx) => (
          <div key={idx} className="p-4 border rounded shadow-sm space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                {post.author[0]}
              </div>
              <div>
                <p className="font-bold">{post.author}</p>
                <p className="text-gray-500 text-sm">{post.role}</p>
              </div>
            </div>
            <p>{post.text}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post media"
                className="w-full rounded max-h-80 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
