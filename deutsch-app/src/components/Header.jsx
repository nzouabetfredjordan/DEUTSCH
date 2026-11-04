import { useState } from 'react';
import { siteData } from '../data/siteData';

const navItems = [
  { name: 'Accueil', nameDe: 'Start', to: '/' },
  { name: 'Méthode', nameDe: 'Methode', to: '/method' },
  { name: 'Exercices', nameDe: 'Übungen', to: '/exercises' },
  { name: 'Dashboard', nameDe: 'Dashboard', to: '/dashboard' }
];

export default function Header({ currentPath, navigate, onOpenAuth, user, language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const menuLabel = language === 'de' ? 'DE' : 'FR';

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <button
          type="button"
          className="brand brand-button"
          aria-label="Apprendre l’allemand Accueil"
          onClick={() => navigate('/')}
        >
          <img src="/deutschlogo.jpeg" alt="DEUTSCHE logo" />
          <span>{siteData.company}</span>
        </button>

        <nav className="main-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <button
              key={item.to}
              type="button"
              className={item.to === currentPath ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate(item.to)}
            >
              {language === 'de' ? item.nameDe : item.name}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="lang-toggle" onClick={() => setLanguage((current) => (current === 'fr' ? 'de' : 'fr'))}>
            {menuLabel}
          </button>
          <button type="button" className="secondary-btn nav-auth-btn" onClick={() => onOpenAuth('login')}>
            {user ? `${user.firstName}` : language === 'de' ? 'Anmelden' : 'Se connecter'}
          </button>
          <button type="button" className="primary-btn small" onClick={() => onOpenAuth('signup')}>
            {language === 'de' ? 'Registrieren' : 'S’inscrire'}
          </button>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <button key={item.to} type="button" className="mobile-link" onClick={() => handleNavigate(item.to)}>
              {language === 'de' ? item.nameDe : item.name}
            </button>
          ))}
          <div className="mobile-auth-row">
            <button type="button" className="secondary-btn" onClick={() => { onOpenAuth('login'); setMenuOpen(false); }}>
              {language === 'de' ? 'Anmelden' : 'Se connecter'}
            </button>
            <button type="button" className="primary-btn" onClick={() => { onOpenAuth('signup'); setMenuOpen(false); }}>
              {language === 'de' ? 'Registrieren' : 'S’inscrire'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
