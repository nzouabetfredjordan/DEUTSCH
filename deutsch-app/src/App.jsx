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

  const addTrackedUser = (user) => {
    const safeUser = {
      firstName: user?.firstName || user?.name || 'Apprenant',
      lastName: user?.lastName || '',
      email: user?.email || 'apprenant@deutsch.app',
      provider: user?.provider || 'manual',
      level: user?.level || 'A1',
      skill: user?.skill || 'Test gratuit',
      progress: user?.progress ?? 0,
      connected: user?.connected ?? true,
      status: user?.status || 'actif'
    };

    setCurrentUser({
      firstName: safeUser.firstName,
      lastName: safeUser.lastName,
      email: safeUser.email,
      provider: safeUser.provider
    });

    setTrackedUsers((current) => {
      const key = `${safeUser.email.toLowerCase()}-${safeUser.provider}`;
      const exists = current.some((entry) => `${entry.email.toLowerCase()}-${entry.provider}` === key);

      if (exists) {
        return current.map((entry) =>
          `${entry.email.toLowerCase()}-${entry.provider}` === key
            ? {
                ...entry,
                connected: true,
                status: 'actif',
                level: safeUser.level,
                skill: safeUser.skill,
                progress: Math.max(entry.progress || 0, safeUser.progress || 0)
              }
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
          status: safeUser.status,
          connected: safeUser.connected,
          progress: safeUser.progress,
          level: safeUser.level,
          skill: safeUser.skill,
          provider: safeUser.provider
        }
      ];
    });
  };

  const handleAuthSuccess = (user) => {
    addTrackedUser(user);
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
          onTrackedUserAdd={addTrackedUser}
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
