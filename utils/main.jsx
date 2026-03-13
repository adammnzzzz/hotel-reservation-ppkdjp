import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { injectStore } from "../api/axiosInstance";
import App from "./App.jsx";
import "../src/styles/global.css";

// Inject store ke axios agar bisa akses state (seperti token) di luar komponen
injectStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
