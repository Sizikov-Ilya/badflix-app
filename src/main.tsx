import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App.tsx";
import { CssBaseline } from "@mui/material";
import { store } from "./app/store.ts";
import "bear-react-carousel/dist/index.css";
import ToggleColorMode from "./context/toggleColorMode.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToggleColorMode>
      <CssBaseline />
      <App />
    </ToggleColorMode>
  </Provider>
);
