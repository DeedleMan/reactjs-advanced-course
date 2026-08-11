import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "@/features/authRouting";

import { router } from "./router";
import { store } from "./store";

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
);

export default App;
