import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // <-- IMPORTANTE

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* <-- ENVUELVE TODA LA APP */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
