import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicPage } from "./PublicPage";

export const AppRouter = () => (
  <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/public" element={<PublicPage />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
