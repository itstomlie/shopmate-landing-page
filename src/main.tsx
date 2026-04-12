import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.itstomlie.Guruu&pcampaignid=shopmate-landing-page";
const path = window.location.pathname.replace(/\/+$/, "") || "/";

if (path === "/download-android") {
  window.location.replace(PLAY_STORE_URL);
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
