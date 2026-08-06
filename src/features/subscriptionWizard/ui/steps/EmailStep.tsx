import { FC } from "react";

import styles from "../SubscriptionWizard.module.css";

export interface IEmailStepProps {
  email: string;
  error: string | null;
  pending: boolean;
  onChange: (email: string) => void;
  onSubmit: () => void;
}

export const EmailStep: FC<IEmailStepProps> = ({
  email,
  error,
  pending,
  onChange,
  onSubmit,
}) => (
  <div className={styles["wizard-step"]}>
    <h2 className={styles["wizard-title"]}>Шаг 1: Ввод email</h2>
    <p className={styles["wizard-desc"]}>
      Введите ваш email для подписки на рассылку
    </p>
    <div className={styles["wizard-field"]}>
      <label className={styles["wizard-label"]}>
        <span>Email</span>
        <input
          type="email"
          className={styles["wizard-input"]}
          value={email}
          onChange={(e) => onChange(e.target.value)}
          placeholder="example@mail.com"
          autoComplete="email"
        />
      </label>
      {error && <span className={styles["wizard-error"]}>{error}</span>}
    </div>
    <button
      type="button"
      className={styles["wizard-button"]}
      onClick={onSubmit}
      disabled={pending}
    >
      {pending ? "Отправка…" : "Далее"}
    </button>
  </div>
);
