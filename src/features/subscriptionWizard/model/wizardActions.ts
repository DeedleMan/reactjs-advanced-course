import { z } from "zod/v3";

export type TWizardState =
  | { status: "idle"; email: string }
  | { status: "error"; message: string }
  | { status: "success"; email: string };

type TWizardAction =
  | { type: "submit-email"; email: string }
  | { type: "confirm" }
  | { type: "reset" }
  | { type: "go-back" };

const emailSchema = z.object({
  email: z.string().min(1, "Email не указан").email("Введите корректный email"),
});

export const wizardAction = (
  prevState: TWizardState,
  action: TWizardAction,
): TWizardState => {
  switch (action.type) {
    case "submit-email": {
      const trimmedEmail = action.email.trim();

      try {
        emailSchema.parse({ email: trimmedEmail });
        return { status: "idle", email: trimmedEmail };
      } catch (err) {
        if (err instanceof z.ZodError) {
          return { status: "error", message: err.issues[0].message };
        }
        return { status: "error", message: "Неизвестная ошибка" };
      }
    }

    case "confirm": {
      if (prevState.status !== "idle" || !prevState.email) {
        return { status: "error", message: "Сначала введите email" };
      }
      return { status: "success", email: prevState.email };
    }

    case "reset":
    case "go-back":
      return { status: "idle", email: "" };

    default:
      return prevState;
  }
};
