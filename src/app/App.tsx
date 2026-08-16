import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "@/features/authRouting";

import { ThemeProvider } from "@/shared/ui/theme/ThemeProvider";

import { router } from "./router";
import { store } from "./store";

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </Provider>
);

export default App;
