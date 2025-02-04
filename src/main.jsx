import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loader from "./components/Loader/Loader.jsx";
import "./assets/css/index.css";
import "./i18n/config.js";
import App from "./components/App.jsx";

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <HelmetProvider>
            <GoogleOAuthProvider clientId={clientId}>
              <Loader />
              <App />
            </GoogleOAuthProvider>
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
