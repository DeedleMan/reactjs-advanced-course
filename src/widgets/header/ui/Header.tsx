import { FC } from "react";
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
];

export const Header: FC = () => {
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
