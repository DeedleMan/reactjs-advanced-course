import styles from "../SubscriptionWizard.module.css";

interface ISuccessStepProps {
  email: string;
}

export const SuccessStep = ({ email }: ISuccessStepProps) => (
  <div className={styles["wizard-step"]}>
    <h2 className={styles["wizard-title"]}>Готово!</h2>
    <p className={styles["wizard-desc"]}>
      Вы успешно подписаны на рассылку с email{" "}
      <strong className={styles["wizard-email--highlight"]}>{email}</strong>
    </p>
  </div>
);
