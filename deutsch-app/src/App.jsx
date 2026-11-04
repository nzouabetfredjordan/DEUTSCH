import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DashboardPage from './pages/DashboardPage';
import AuthModal from './components/AuthModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/method': AboutPage,
  '/exercises': ServicesPage,
  '/services': ServicesPage,
  '/dashboard': DashboardPage
};

function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');
  const [authMode, setAuthMode] = useState('login');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [trackedUsers, setTrackedUsers] = useState([]);
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (user) => {
    const safeUser = {
      firstName: user?.firstName || 'Apprenant',
      lastName: user?.lastName || 'Connecté',
      email: user?.email || 'apprenant@deutsch.app',
      provider: user?.provider || 'email'
    };

    setCurrentUser(safeUser);
    setTrackedUsers((current) => {
      const key = `${safeUser.email.toLowerCase()}-${safeUser.provider}`;
      const exists = current.some((entry) => `${entry.email.toLowerCase()}-${entry.provider}` === key);

      if (exists) {
        return current.map((entry) =>
          `${entry.email.toLowerCase()}-${entry.provider}` === key
            ? { ...entry, connected: true, status: 'actif' }
            : entry
        );
      }

      return [
        ...current,
        {
          id: Date.now(),
          name: safeUser.firstName,
          surname: safeUser.lastName,
          email: safeUser.email,
          status: 'actif',
          connected: true,
          progress: 0,
          level: 'A1',
          skill: 'Nouveau',
          provider: safeUser.provider
        }
      ];
    });
    setIsAuthOpen(false);
  };

  const Page = routes[currentPath] || HomePage;

  return (
    <div className="app-shell">
      <Header
        currentPath={currentPath}
        navigate={navigate}
        onOpenAuth={openAuth}
        user={currentUser}
        language={language}
        setLanguage={setLanguage}
      />
      <main className="page-content">
        <Page
          navigate={navigate}
          user={currentUser}
          language={language}
          trackedUsers={trackedUsers}
          onOpenAuth={openAuth}
        />
      </main>
      <Footer language={language} />
      <FloatingWhatsApp />
      <AuthModal
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;
