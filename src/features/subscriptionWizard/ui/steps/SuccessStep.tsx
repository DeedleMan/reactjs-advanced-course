import { FC } from "react";

import styles from "../SubscriptionWizard.module.css";

export interface ISuccessStepProps {
  email: string;
}

export const SuccessStep: FC<ISuccessStepProps> = ({ email }) => (
  <div className={styles["wizard-step"]}>
    <h2 className={styles["wizard-title"]}>Готово!</h2>
    <p className={styles["wizard-desc"]}>
      Вы успешно подписаны на рассылку с email{" "}
      <strong className={styles["wizard-email--highlight"]}>{email}</strong>
    </p>
  </div>
);
