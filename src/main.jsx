import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/app/store"; 
import { injectStore } from "@/api/axiosInstance";
import App from "./App.jsx"; 
import "@/styles/global.css"; 

// Pastikan fungsi ini tidak bikin crash
try {
  injectStore(store);
} catch (e) {
  console.error("Error pas inject store:", e);
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}