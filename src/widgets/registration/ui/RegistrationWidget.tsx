import type { TFormData } from "@/features/registration/model/useRegistrationForm";
import { RegistrationForm } from "@/features/registration/ui/RegistrationForm";

export interface IRegistrationWidgetProps {
  onSubmit?: (data: TFormData) => Promise<void>;
}

export const RegistrationWidget = ({ onSubmit }: IRegistrationWidgetProps) => (
  <div>
    <h1>Регистрация</h1>
    <RegistrationForm onRegister={onSubmit} />
  </div>
);
