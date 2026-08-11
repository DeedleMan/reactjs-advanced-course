import { useGetUserMeQuery } from "@/shared/api/baseApi";

import styles from "./ui/ProfilePage.module.css";
import { useAuth } from "./useAuth";

export const ProfilePage = () => {
  const { logout } = useAuth();
  const { data: user, isLoading } = useGetUserMeQuery();

  if (isLoading) {
    return <div className={styles["profilepage-loading"]}>Загрузка...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles["profilepage-container"]}>
      <h1 className={styles["profilepage-title"]}>Профиль</h1>
      <div className={styles["profilepage-info"]}>
        <div className={styles["profilepage-avatar-wrapper"]}>
          {user.avatarPath && (
            <img
              src={user.avatarPath}
              alt={user.name}
              className={styles["profilepage-avatar"]}
            />
          )}
        </div>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Имя:</strong> {user.name}
        </p>
        <p>
          <strong>О себе:</strong> {user.about}
        </p>
        <p>
          <strong>Телефон:</strong> {user.phone}
        </p>
        <p>
          <strong>Роли:</strong> {user.roles.join(", ")}
        </p>
      </div>
      <button className={styles["profilepage-button"]} onClick={logout}>
        Выйти
      </button>
    </div>
  );
};
