import { ConfirmationStep, EmailStep, SuccessStep } from "./steps";
import styles from "./SubscriptionWizard.module.css";
import { useSubscriptionWizard } from "../model/useSubscriptionWizard";

export const SubscriptionWizard = () => {
  const {
    state,
    step,
    email,
    isPending,
    setEmail,
    submitEmail,
    confirm,
    back,
    reset,
  } = useSubscriptionWizard();

  const isError = state.status === "error";
  const isSuccess = state.status === "success";

  if (isSuccess) {
    return (
      <div className={styles["wizard-card"]}>
        <SuccessStep email={state.email} />
        <button
          type="button"
          className={`${styles["wizard-button"]} ${styles["wizard-button--secondary"]}`}
          onClick={reset}
        >
          Начать заново
        </button>
      </div>
    );
  }

  return (
    <div className={styles["wizard-card"]}>
      {step === 1 && (
        <EmailStep
          email={email}
          onChange={setEmail}
          onSubmit={submitEmail}
          error={isError ? state.message : null}
          pending={isPending}
        />
      )}
      {step === 2 && (
        <ConfirmationStep
          email={email}
          onConfirm={confirm}
          onBack={back}
          pending={isPending}
        />
      )}
    </div>
  );
};
