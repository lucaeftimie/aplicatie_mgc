import React, { useEffect, useMemo, useRef, useState } from "react";

const LOCAL_KEY = "poc_internal_feed_posts_v1";

const defaultUsers = [
  { id: "u1", name: "Alex Ionescu", handle: "alex", bio: "Platform engineer" },
  { id: "u2", name: "Maria Pop", handle: "maria", bio: "Product manager" },
  { id: "u3", name: "Denis R.", handle: "denis", bio: "Designer" },
];
export function HomeButton({ to = "/", label = "Home" }) {
  const goHome = (e) => {
    e?.preventDefault();
    window.location.href = to;
  };

  return (
    <button
      type="button"
      onClick={goHome}
      style={{
        padding: "8px 10px",
        borderRadius: 8,
        border: "1px solid #d0d0d0",
        background: "#fff",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
const samplePosts = [
  {
    id: "p1",
    authorId: "u1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat et massa sit amet viverra. Maecenas dapibus pharetra sapien vitae aliquam. Duis tristique tortor in sem mattis, nec hendrerit neque tempus. Vivamus tincidunt libero sed tellus iaculis ullamcorper. Donec erat purus, volutpat vel orci non, congue egestas odio. Curabitur imperdiet ante orci, ac luctus mi tincidunt non. Vestibulum iaculis posuere augue, in efficitur quam tempor non. In quis efficitur eros, id vestibulum dolor. Curabitur blandit convallis erat. Pellentesque volutpat massa eget elementum molestie. Nunc varius ipsum eget lectus pulvinar scelerisque. Nullam ut lectus id mi egestas dapibus. Sed efficitur elit rutrum est aliquam, consectetur blandit massa ullamcorper.",
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
    likes: ["u2"],
    comments: [
      {
        id: "c1",
        authorId: "u2",
        text: "Nice start!",
        createdAt: Date.now() - 1000 * 60 * 50,
      },
    ],
    pinned: true,
  },
  {
    id: "p2",
    authorId: "u3",
    text: "Nam dapibus, leo at vehicula viverra, nibh ipsum porttitor magna, at mattis augue lacus eget urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus euismod lorem nisl, sit amet rutrum est dignissim et. In ultrices quis elit at aliquam. Pellentesque hendrerit metus nec ligula bibendum, eget mattis nulla luctus. Nulla porttitor sed libero at rutrum. Sed ultrices, ex a semper elementum, tellus tortor suscipit justo, eget sollicitudin lacus ligula vitae ligula.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    likes: [],
    comments: [],
    pinned: false,
  },
];

function now() {
  return Date.now();
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function InternalChat() {
  const [currentUser] = useState(defaultUsers[0]);
  const [users] = useState(defaultUsers);

  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return samplePosts;
  });

  const [compose, setCompose] = useState("");
  const [search, setSearch] = useState("");
  const [showOnlyPinned, setShowOnlyPinned] = useState(false);
  const commentRefs = useRef({});

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(posts));
    } catch (e) {}
  }, [posts]);

  const postsFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = [...posts].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.createdAt - a.createdAt;
    });
    if (showOnlyPinned) arr = arr.filter((p) => p.pinned);
    if (!q) return arr;
    return arr.filter(
      (p) =>
        p.text.toLowerCase().includes(q) ||
        getUser(p.authorId).name.toLowerCase().includes(q) ||
        getUser(p.authorId).handle.toLowerCase().includes(q)
    );
  }, [posts, search, showOnlyPinned]);

  function getUser(id) {
    return (
      users.find((u) => u.id === id) || {
        id,
        name: "Unknown",
        handle: "unknown",
      }
    );
  }

  function createPost(e) {
    e?.preventDefault();
    const t = compose.trim();
    if (!t) return;
    const newPost = {
      id: uid("p"),
      authorId: currentUser.id,
      text: t,
      createdAt: now(),
      likes: [],
      comments: [],
      pinned: false,
    };
    setCompose("");
    setPosts((s) => [newPost, ...s]);
  }

  function toggleLike(postId) {
    setPosts((s) =>
      s.map((p) => {
        if (p.id !== postId) return p;
        const has = p.likes.includes(currentUser.id);
        return {
          ...p,
          likes: has
            ? p.likes.filter((id) => id !== currentUser.id)
            : [...p.likes, currentUser.id],
        };
      })
    );
  }

  function addComment(postId, text) {
    const t = text.trim();
    if (!t) return;
    setPosts((s) =>
      s.map((p) => {
        if (p.id !== postId) return p;
        const c = {
          id: uid("c"),
          authorId: currentUser.id,
          text: t,
          createdAt: now(),
        };
        return { ...p, comments: [...p.comments, c] };
      })
    );
    const ref = commentRefs.current[postId];
    if (ref) ref.value = "";
  }

  function deletePost(postId) {
    setPosts((s) => s.filter((p) => p.id !== postId));
  }

  function togglePin(postId) {
    setPosts((s) =>
      s.map((p) => (p.id === postId ? { ...p, pinned: !p.pinned } : p))
    );
  }

  function followAuthor(postId) {
    setPosts((s) =>
      s.map((p) => {
        if (p.id !== postId) return p;
        const meta = p.meta || {};
        return { ...p, meta: { ...meta, followedByMe: !meta.followedByMe } };
      })
    );
  }

  const s = {
    page: {
      fontFamily: "Inter, Roboto, system-ui, sans-serif",
      padding: 18,
      maxWidth: 900,
      margin: "0 auto",
      color: "#1b1b1b",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    title: { fontSize: 20, fontWeight: 600 },
    controls: { display: "flex", gap: 8, alignItems: "center" },
    input: {
      padding: "8px 10px",
      borderRadius: 8,
      border: "1px solid #d0d0d0",
      minWidth: 220,
    },
    composeBox: {
      display: "flex",
      gap: 12,
      padding: 12,
      border: "1px solid #e6e6e6",
      borderRadius: 10,
      marginBottom: 12,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 8,
      background: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      color: "#333",
    },
    composeArea: { flex: 1, display: "flex", flexDirection: "column", gap: 8 },
    buttonPrimary: {
      background: "#0366d6",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: 8,
      cursor: "pointer",
    },
    buttonGhost: {
      background: "#fff",
      color: "#333",
      border: "1px solid #d0d0d0",
      padding: "8px 10px",
      borderRadius: 8,
      cursor: "pointer",
    },
    postCard: {
      padding: 12,
      borderRadius: 10,
      border: "1px solid #e9e9e9",
      marginBottom: 12,
      background: "#fff",
    },
    postHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
    },
    postMeta: { display: "flex", gap: 12, alignItems: "center" },
    username: { fontWeight: 600 },
    handle: { color: "#666", fontSize: 13 },
    actions: { display: "flex", gap: 8, alignItems: "center" },
    actionBtn: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: "#555",
    },
    commentBox: { marginTop: 8, display: "flex", gap: 8, alignItems: "center" },
    commentInput: {
      flex: 1,
      padding: "8px 10px",
      borderRadius: 8,
      border: "1px solid #ddd",
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.title}>Internal Feed</div>
        <div style={s.controls}>
          <input
            aria-label="Search feed"
            placeholder="Search people or posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.input}
          />
          <button
            onClick={() => setShowOnlyPinned((v) => !v)}
            aria-pressed={showOnlyPinned}
            style={{
              ...s.buttonGhost,
              background: showOnlyPinned ? "#f3f8ff" : "#fff",
            }}
          >
            {showOnlyPinned ? "Showing pinned" : "Pinned"}
          </button>
        </div>
      </div>

      <form onSubmit={createPost} style={s.composeBox}>
        <div style={s.avatar}>
          {currentUser.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div style={s.composeArea}>
          <textarea
            aria-label="Write a new post"
            placeholder="What's happening in your team?"
            value={compose}
            onChange={(e) => setCompose(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              minHeight: 80,
              resize: "vertical",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#6b6b6b", fontSize: 13 }}>
              <strong>{currentUser.name}</strong> •{" "}
              <span style={{ color: "#999" }}>{currentUser.bio}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => setCompose("")}
                style={s.buttonGhost}
              >
                Clear
              </button>
              <button type="submit" style={s.buttonPrimary}>
                Post
              </button>
            </div>
          </div>
        </div>
      </form>

      <div aria-live="polite">
        {postsFiltered.length === 0 && (
          <div style={{ padding: 20, textAlign: "center", color: "#777" }}>
            No posts match your query.
          </div>
        )}

        {postsFiltered.map((post) => {
          const author = getUser(post.authorId);
          const liked = post.likes.includes(currentUser.id);
          return (
            <article key={post.id} style={s.postCard}>
              <div style={s.postHeader}>
                <div style={s.postMeta}>
                  <div style={s.avatar}>
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div style={s.username}>
                      {author.name}{" "}
                      <span style={s.handle}>@{author.handle}</span>{" "}
                      <span style={{ color: "#888", fontSize: 12 }}>
                        · {timeAgo(post.createdAt)}
                      </span>
                    </div>
                    <div style={{ color: "#444", marginTop: 6 }}>
                      {post.text}
                    </div>
                    {post.pinned && (
                      <div
                        style={{ marginTop: 8, fontSize: 12, color: "#075985" }}
                      >
                        📌 Pinned
                      </div>
                    )}
                  </div>
                </div>

                <div style={s.actions}>
                  <button
                    title="Like"
                    onClick={() => toggleLike(post.id)}
                    aria-pressed={liked}
                    style={s.actionBtn}
                  >
                    {liked ? "❤️" : "🤍"} {post.likes.length}
                  </button>

                  <button
                    title="Add comment"
                    onClick={() => {
                      const ref = commentRefs.current[post.id];
                      if (ref) ref.focus();
                    }}
                    style={s.actionBtn}
                  >
                    💬 {post.comments.length}
                  </button>

                  <button
                    title="Pin"
                    onClick={() => togglePin(post.id)}
                    style={s.actionBtn}
                  >
                    {post.pinned ? "Unpin" : "Pin"}
                  </button>

                  {post.authorId === currentUser.id && (
                    <button
                      title="Delete post"
                      onClick={() => {
                        if (window.confirm("Delete this post?"))
                          deletePost(post.id);
                      }}
                      style={{ ...s.actionBtn, color: "#b00020" }}
                    >
                      🗑
                    </button>
                  )}
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                {post.comments.map((c) => {
                  const ca = getUser(c.authorId);
                  return (
                    <div
                      key={c.id}
                      style={{ display: "flex", gap: 10, marginTop: 8 }}
                    >
                      <div
                        style={{
                          ...s.avatar,
                          width: 34,
                          height: 34,
                          fontSize: 13,
                        }}
                      >
                        {ca.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div
                        style={{
                          background: "#fbfbfb",
                          padding: 8,
                          borderRadius: 8,
                          flex: 1,
                        }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                          {ca.name}{" "}
                          <span style={{ color: "#888", fontSize: 12 }}>
                            @{ca.handle} · {timeAgo(c.createdAt)}
                          </span>
                        </div>
                        <div style={{ marginTop: 4 }}>{c.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={s.commentBox}>
                <input
                  aria-label={`Add a comment to post ${post.id}`}
                  placeholder="Write a comment..."
                  ref={(el) => (commentRefs.current[post.id] = el)}
                  style={s.commentInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      addComment(post.id, e.target.value);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const el = commentRefs.current[post.id];
                    if (el) addComment(post.id, el.value || "");
                  }}
                  style={s.buttonPrimary}
                >
                  Reply
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
