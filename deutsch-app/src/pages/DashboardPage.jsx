import { useEffect, useMemo, useState } from 'react';
import { adminCredentials } from '../data/siteData';

export default function DashboardPage({ trackedUsers = [], language = 'fr' }) {
  const isGerman = language === 'de';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginState, setLoginState] = useState({ username: '', password: '' });
  const [learners, setLearners] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setLearners(trackedUsers);
  }, [trackedUsers]);

  const stats = useMemo(() => {
    const total = learners.length;
    const active = learners.filter((user) => user.status === 'actif').length;
    const connected = learners.filter((user) => user.connected).length;
    const averageProgress = Math.round(
      learners.reduce((sum, user) => sum + user.progress, 0) / (total || 1)
    );

    return { total, active, connected, averageProgress };
  }, [learners]);

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      loginState.username === adminCredentials.username &&
      loginState.password === adminCredentials.password
    ) {
      setIsLoggedIn(true);
      setError('');
      return;
    }

    setError(isGerman ? 'Benutzername oder Passwort ist falsch.' : 'Identifiant ou mot de passe incorrect.');
  };

  const updateStatus = (id, nextStatus) => {
    setLearners((current) =>
      current.map((learner) =>
        learner.id === id ? { ...learner, status: nextStatus } : learner
      )
    );
  };

  const deleteLearner = (id) => {
    setLearners((current) => current.filter((learner) => learner.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <main className="page-shell">
        <div className="container dashboard-auth-container">
          <div className="dashboard-login-card reveal">
            <div className="dashboard-brand">
              <img src="/deutschlogo.jpeg" alt="DEUTSCHE logo" />
              <h2>{isGerman ? 'Admin-Dashboard' : 'Dashboard admin'}</h2>
            </div>
            <form onSubmit={handleLogin} className="dashboard-login-form">
              <label>
                {isGerman ? 'Benutzername' : 'Identifiant'}
                <input
                  type="text"
                  value={loginState.username}
                  onChange={(event) => setLoginState((current) => ({ ...current, username: event.target.value }))}
                  placeholder="admin"
                />
              </label>
              <label>
                {isGerman ? 'Passwort' : 'Mot de passe'}
                <input
                  type="password"
                  value={loginState.password}
                  onChange={(event) => setLoginState((current) => ({ ...current, password: event.target.value }))}
                  placeholder="123456"
                />
              </label>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="primary-btn full-width">{isGerman ? 'Anmelden' : 'Se connecter'}</button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell dashboard-page">
      <div className="container dashboard-shell">
        <div className="dashboard-header reveal">
          <div>
            <span className="eyebrow dark">{isGerman ? 'Verwaltung' : 'Administration'}</span>
            <h2>{isGerman ? 'Dashboard für Deutschlernen' : 'Tableau de bord Apprendre l’allemand'}</h2>
          </div>
          <button type="button" className="secondary-btn" onClick={() => setIsLoggedIn(false)}>
            {isGerman ? 'Abmelden' : 'Déconnexion'}
          </button>
        </div>

        <div className="stats-grid dashboard-grid reveal">
          <div className="stat-item">
            <strong>{stats.total}</strong>
            <span>{isGerman ? 'Nutzer' : 'Utilisateurs'}</span>
          </div>
          <div className="stat-item">
            <strong>{stats.active}</strong>
            <span>{isGerman ? 'Aktiv' : 'Actifs'}</span>
          </div>
          <div className="stat-item">
            <strong>{stats.connected}</strong>
            <span>{isGerman ? 'Verbunden' : 'Connectés'}</span>
          </div>
          <div className="stat-item">
            <strong>{stats.averageProgress}%</strong>
            <span>{isGerman ? 'Fortschritt' : 'Progression'}</span>
          </div>
        </div>

        {learners.length === 0 ? (
          <div className="empty-dashboard reveal">
            <p>{isGerman ? 'Noch kein Lernender wird verfolgt. Das Dashboard startet bei 0, bis ein Nutzer sich anmeldet.' : 'Aucun apprenant n’est encore suivi. Le tableau démarre à zéro jusqu’à l’inscription ou la connexion d’un utilisateur.'}</p>
          </div>
        ) : (
          <div className="dashboard-table-wrap reveal">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>{isGerman ? 'Name' : 'Nom'}</th>
                  <th>Email</th>
                  <th>{isGerman ? 'Niveau' : 'Niveau'}</th>
                  <th>{isGerman ? 'Kompetenz' : 'Compétence'}</th>
                  <th>{isGerman ? 'Fortschritt' : 'Progression'}</th>
                  <th>{isGerman ? 'Status' : 'Statut'}</th>
                  <th>{isGerman ? 'Aktionen' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {learners.map((learner) => (
                  <tr key={learner.id}>
                    <td>{learner.name} {learner.surname}</td>
                    <td>{learner.email}</td>
                    <td>{learner.level}</td>
                    <td>{learner.skill}</td>
                    <td>
                      <div className="progress-track">
                        <span style={{ width: `${learner.progress}%` }} />
                      </div>
                      {learner.progress}%
                    </td>
                    <td>
                      <span className={`status-pill ${learner.status === 'actif' ? 'active' : 'disabled'}`}>
                        {learner.status}
                      </span>
                    </td>
                    <td className="table-actions">
                      <button type="button" className="secondary-btn small-btn" onClick={() => updateStatus(learner.id, learner.status === 'actif' ? 'désactivé' : 'actif')}>
                        {learner.status === 'actif' ? (isGerman ? 'Deaktivieren' : 'Désactiver') : (isGerman ? 'Aktivieren' : 'Activer')}
                      </button>
                      <button type="button" className="primary-btn small-btn" onClick={() => deleteLearner(learner.id)}>
                        {isGerman ? 'Löschen' : 'Supprimer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
