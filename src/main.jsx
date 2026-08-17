import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";


import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     <ThemeProvider>
  <App />
  <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#fff",
      },
    }}
  />
</ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);