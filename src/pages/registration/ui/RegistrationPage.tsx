import { RegistrationWidget } from "@/widgets/registration/ui/RegistrationWidget";

import { useAuth } from "@/features/authRouting/useAuth";

export const RegistrationPage = () => {
  const { register: registerUser } = useAuth();

  const handleRegister = async (data: {
    username: string;
    email: string;
    password: string;
  }): Promise<void> => {
    await registerUser(data.username, data.email, data.password);
  };

  return <RegistrationWidget onSubmit={handleRegister} />;
};
