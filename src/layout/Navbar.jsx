import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { usePage } from "./PageContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const { setPage } = usePage();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (callback) => {
    callback();
    setIsOpen(false);
  };

  return (
    <header>
      <p>Fitness Trackr</p>
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {isOpen && (
        <nav>
          <a onClick={() => handleClick(() => setPage("activities"))}>
            Activities
          </a>
          {token ? (
            <a onClick={() => handleClick(logout)}>Log out</a>
          ) : (
            <>
              <a onClick={() => handleClick(() => setPage("register"))}>
                Register
              </a>
              <a onClick={() => handleClick(() => setPage("login"))}>Login</a>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
