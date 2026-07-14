import { NavLink } from "react-router-dom";
import { FiShield } from "react-icons/fi";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <FiShield />
          </div>

          <div>
            <h1>ScamSecure API</h1>
            <p>AI-Powered URL Security Analysis REST API</p>
          </div>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/trending"
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            Trending
          </NavLink>

          <NavLink
            to="/documentation"
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            Documentation
          </NavLink>
        </nav>

      </div>
    </header>
  );
};

export default Header;