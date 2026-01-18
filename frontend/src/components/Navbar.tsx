import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div>
        <Link to="/">Dashboard</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
}
