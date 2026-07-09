import LandingPage from './components/LandingPage';
import AdminPage from './admin/AdminPage';
import './App.css';

const isAdminRoute = /^\/admin(\/|$)/.test(window.location.pathname);

function App() {
  if (isAdminRoute) {
    return <AdminPage />;
  }

  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
