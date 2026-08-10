import { Link, useLocation } from "react-router-dom";

import styles from "./Header.module.css";

interface IHeaderNavLink {
  to: string;
  label: string;
}

const navLinks: IHeaderNavLink[] = [
  { to: "/tasks", label: "Задачи" },
  { to: "/register", label: "Регистрация" },
  { to: "/subscribe", label: "Подписка" },
  { to: "/clickTimer", label: "ClickTimer" },
  { to: "/previousinput", label: "Previos Input" },
  { to: "/focustracker", label: "Focus Tracker" },
  { to: "/debouncedlogger", label: "Debounced Logger" },
  { to: "/websocketlogger", label: "WebSocket Logger" },
];

export const Header = () => {
  const location = useLocation();

  return (
    <header className={styles["header"]}>
      <nav className={styles["header-nav"]}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles["header-link"]} ${
                isActive ? styles["header-link--active"] : ""
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
