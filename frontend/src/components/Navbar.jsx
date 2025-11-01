// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="site-navbar">
//       <div className="site-nav-inner">
//         <Link className="site-nav-link" to="/">
//           Home
//         </Link>
//         <Link className="site-nav-link" to="/profile">
//           Profile
//         </Link>
//         <Link className="site-nav-link" to="/internal-chat">
//           Internal chat
//         </Link>
//       </div>
//     </nav>
//   );
// }

import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "2rem", // space out links
    padding: "1rem 2rem",
    // backgroundColor: "#1e1e1e",
  };

  const linkStyle = {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "1.1rem",
    paddingBottom: "4px",
    transition: "color 0.3s, borderBottom 0.3s",
  };

  const activeLinkStyle = {
    color: "#fff",
    borderBottom: "2px solid #FF4F00",
    fontWeight: "bold",
  };

  return (
    <nav
      style={{
        backgroundColor: "#003152",
      }}
    >
      <div style={navStyle}>
        <NavLink
          to="/"
          end
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/profile"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/internal-chat"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
          }
        >
          Internal Chat
        </NavLink>

        <NavLink
          to="/gambling"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
          }
        >
          Reward Zone
        </NavLink>
      </div>
    </nav>
  );
}
