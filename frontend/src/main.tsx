import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext.tsx";
import Modal from "react-modal";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
);
