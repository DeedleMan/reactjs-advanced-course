import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod/v3";

import styles from "./ui/LoginPage.module.css";
import { useAuth } from "./useAuth";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Пароль обязателен"),
});

type TLoginForm = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState<string>("");

  const from = (() => {
    const state = location.state as { from?: { pathname: string } } | null;
    return state?.from?.pathname || "/profile";
  })();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginForm): Promise<void> => {
    setError("");
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Ошибка входа";
      setError(message);
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      {error && <div className={styles["authform-error"]}>{error}</div>}
      <form
        className={styles["authform-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={styles["authform-label"]}>
          Email
          <input
            type="email"
            {...register("email")}
            className={styles["authform-input"]}
          />
          <span className={styles["authform-error"]}>
            {errors.email?.message}
          </span>
        </label>

        <label className={styles["authform-label"]}>
          Пароль
          <input
            type="password"
            {...register("password")}
            className={styles["authform-input"]}
          />
          <span className={styles["authform-error"]}>
            {errors.password?.message}
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className={styles["authform-button"]}
        >
          {isSubmitting || isLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
};
