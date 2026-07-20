import LandingPage from "./components/LandingPage";
import AdminPage from "./admin/AdminPage";
import "./App.css";

import { Analytics } from "@vercel/analytics/react";

const isAdminRoute = /^\/admin(\/|$)/.test(window.location.pathname);

function App() {
  if (isAdminRoute) {
    return <AdminPage />;
  }

  return (
    <div className="App">
      <LandingPage />
      <Analytics />
    </div>
  );
}

export default App;
