import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { AuthProvider } from "./contex/auth";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster />
    </Router>
  </Provider>
);
