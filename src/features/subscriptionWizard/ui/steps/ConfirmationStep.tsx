import { FC } from "react";

import styles from "../SubscriptionWizard.module.css";

export interface IConfirmationStepProps {
  email: string;
  pending: boolean;
  onConfirm: () => void;
  onBack: () => void;
}

export const ConfirmationStep: FC<IConfirmationStepProps> = ({
  email,
  pending,
  onConfirm,
  onBack,
}) => (
  <div className={styles["wizard-step"]}>
    <h2 className={styles["wizard-title"]}>Шаг 2: Подтверждение</h2>
    <p className={styles["wizard-desc"]}>Подтвердите подписку для email</p>
    <p className={styles["wizard-email"]}>{email}</p>
    <div className={styles["wizard-actions"]}>
      <button
        type="button"
        className={`${styles["wizard-button"]} ${styles["wizard-button--secondary"]}`}
        onClick={onBack}
        disabled={pending}
      >
        Назад
      </button>
      <button
        type="button"
        className={styles["wizard-button"]}
        onClick={onConfirm}
        disabled={pending}
      >
        {pending ? "Подписка…" : "Подписаться"}
      </button>
    </div>
  </div>
);
