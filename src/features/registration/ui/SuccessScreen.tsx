import { FC } from "react";

import styles from "./RegistrationForm.module.css";

export interface ISuccessScreenProps {
  username: string;
  onReset: () => void;
}

export const SuccessScreen: FC<ISuccessScreenProps> = ({
  username,
  onReset,
}) => (
  <div className={styles["registration-success"]}>
    <h2 className={styles["registration-success-title"]}>Добро пожаловать!</h2>
    <p className={styles["registration-success-text"]}>
      Регистрация прошла успешно
    </p>
    <p className={styles["registration-success-username"]}>{username}</p>
    <button
      type="button"
      className={`${styles["registrationform-button"]} ${styles["registrationform-button--secondary"]}`}
      onClick={onReset}
    >
      Начать заново
    </button>
  </div>
);
