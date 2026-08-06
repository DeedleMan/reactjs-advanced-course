import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod/v3";

const registrationSchema = z
  .object({
    username: z.string().min(1, "Имя пользователя обязательно"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Минимум 6 символов"),
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
    socialLinks: z.array(
      z.object({
        url: z.string().url("Введите корректный URL"),
      }),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type TFormData = z.infer<typeof registrationSchema>;

export const useRegistrationForm = () => {
  const form = useForm<TFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { socialLinks: [{ url: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    name: "socialLinks",
    control: form.control,
  });

  return {
    fields,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    register: form.register,
    handleSubmit: form.handleSubmit,
    reset: form.reset,
    append,
    remove,
  };
};
