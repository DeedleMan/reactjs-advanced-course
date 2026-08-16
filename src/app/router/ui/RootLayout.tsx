import { Outlet } from "react-router-dom";

import { Header } from "@/widgets/header/ui/Header";

import { ConfirmDialog } from "@/shared/ui/ConfirmDialog/ConfirmDialog";

export const RootLayout = () => (
  <>
    <Header />
    <Outlet />
    <ConfirmDialog />
  </>
);
