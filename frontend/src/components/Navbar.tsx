import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  function handleClick() {
    logout();
  }
  return (
    <header className="navbar">
      <div>
        <Link to="/">Dashboard</Link>
      </div>

      {user ? (
        <div className="navbar-user">
          <span>{user.email}</span>
          <button onClick={handleClick}>Log out</button>
        </div>
      ) : (
        <div className="navbar-auth-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </header>
  );
}
