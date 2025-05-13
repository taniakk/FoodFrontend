import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProfileProvider } from "./context/profileContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  // </StrictMode>
);
