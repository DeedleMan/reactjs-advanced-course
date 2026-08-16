import { Link, useLocation } from "react-router-dom";

import { useAuth } from "@/features/authRouting/useAuth";

import styles from "./Header.module.css";

interface IHeaderNavLink {
  to: string;
  label: string;
}

const navLinks: IHeaderNavLink[] = [
  { to: "/portal-showcase", label: "Tooltip" },
  { to: "/tasks", label: "Задачи" },
  { to: "/subscribe", label: "Подписка" },
  { to: "/clickTimer", label: "ClickTimer" },
  { to: "/previousinput", label: "Previos Input" },
  { to: "/focustracker", label: "Focus Tracker" },
  { to: "/debouncedlogger", label: "Debounced Logger" },
  { to: "/websocketlogger", label: "WebSocket Logger" },
  { to: "/public", label: "Публичная страница" },
  { to: "/register", label: "Регистрация" },
];

const isNavLinkActive = (pathname: string, to: string): boolean => {
  return pathname === to;
};

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <header className={styles["header"]}>
      <nav className={styles["header-nav"]}>
        {navLinks.map((link) => {
          const isActive = isNavLinkActive(location.pathname, link.to);

          if (link.to === "/register" && isAuthenticated) {
            return null;
          }

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
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className={`${styles["header-link"]} ${
                isNavLinkActive(location.pathname, "/profile")
                  ? styles["header-link--active"]
                  : ""
              }`}
            >
              Профиль
            </Link>
            <button
              type="button"
              className={styles["header-link"]}
              onClick={logout}
            >
              Выход
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className={`${styles["header-link"]} ${
              isNavLinkActive(location.pathname, "/login")
                ? styles["header-link--active"]
                : ""
            }`}
          >
            Вход
          </Link>
        )}
      </nav>
    </header>
  );
};
