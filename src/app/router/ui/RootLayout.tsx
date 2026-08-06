import { Outlet } from "react-router-dom";

import { Header } from "@/widgets/header/ui/Header";

export const RootLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);
