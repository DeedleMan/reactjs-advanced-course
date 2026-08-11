import styles from "./ui/PublicPage.module.css";

export const PublicPage = () => {
  return (
    <div className={styles["publicpage-container"]}>
      <h1 className={styles["publicpage-title"]}>Публичная страница</h1>
      <p>Эта страница доступна всем пользователям.</p>
    </div>
  );
};
