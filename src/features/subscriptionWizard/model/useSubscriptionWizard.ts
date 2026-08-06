import { useState, useTransition, useActionState } from "react";

import { wizardAction, TWizardState } from "./wizardActions";

type TStep = 1 | 2;

interface IUseSubscriptionWizardResult {
  state: TWizardState;
  step: TStep;
  email: string;
  isPending: boolean;
  setEmail: (email: string) => void;
  submitEmail: () => void;
  confirm: () => void;
  back: () => void;
  reset: () => void;
}

export const useSubscriptionWizard = (): IUseSubscriptionWizardResult => {
  const [state, formAction] = useActionState<
    TWizardState,
    | {
        type: "submit-email";
        email: string;
      }
    | { type: "confirm" }
    | { type: "reset" }
    | { type: "go-back" }
  >(wizardAction, { status: "idle", email: "" });

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<TStep>(1);
  const [isPending, startTransition] = useTransition();

  const nextStep =
    state.status === "idle" && state.email
      ? 2
      : ((state.status === "success" ? 2 : 1) as TStep);

  if (step !== nextStep) {
    setStep(nextStep);
  }

  const handleSubmitEmail = () => formAction({ type: "submit-email", email });

  const handleConfirm = () =>
    startTransition(() => {
      formAction({ type: "confirm" });
    });

  const handleBack = () => {
    startTransition(() => {
      formAction({ type: "go-back" });
    });
    setStep(1);
  };

  const handleReset = () => {
    startTransition(() => {
      formAction({ type: "reset" });
    });

    setStep(1);
    setEmail("");
  };

  return {
    state,
    step,
    email,
    isPending,
    setEmail,
    submitEmail: handleSubmitEmail,
    confirm: handleConfirm,
    back: handleBack,
    reset: handleReset,
  };
};
