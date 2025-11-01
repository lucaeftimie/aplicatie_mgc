import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" text-white p-4 flex space-x-4">
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/challenge">Challenge yourself</Link>
    </nav>
  );
}
