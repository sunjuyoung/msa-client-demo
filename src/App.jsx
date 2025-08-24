import { RouterProvider } from "react-router-dom";
import "./App.css";
import root from "./router/index.jsx";
import { AppProviders } from "./app/providers/AppProviders.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={root} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </AppProviders>
  );
}

export default App;
