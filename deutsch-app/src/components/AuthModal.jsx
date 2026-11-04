import { useEffect, useMemo, useState } from 'react';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function AuthModal({ isOpen, mode = 'login', onClose, onAuthSuccess }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  }, [isOpen, mode]);

  const title = useMemo(() =>
    mode === 'signup' ? 'Créer votre compte' : 'Se connecter',
    [mode]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleGoogleLogin = () => {
    if (!googleClientId) {
      onAuthSuccess({
        firstName: 'Google',
        lastName: 'Utilisateur',
        email: 'apprenant@deutsch.app',
        provider: 'google'
      });
      onClose();
      return;
    }

    const target = window.google;
    if (!target?.accounts?.id) {
      setError('Le service Google n’est pas encore disponible. Réessayez dans quelques instants.');
      return;
    }

    target.accounts.id.initialize({
      client_id: googleClientId,
      callback: (response) => {
        const payload = response?.credential ? JSON.parse(atob(response.credential.split('.')[1])) : null;
        if (!payload) {
          setError('Connexion Google impossible pour le moment.');
          return;
        }

        onAuthSuccess({
          firstName: payload.given_name || 'Google',
          lastName: payload.family_name || 'Utilisateur',
          email: payload.email || 'apprenant@deutsch.app',
          provider: 'google'
        });
        onClose();
      }
    });

    target.accounts.id.prompt();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
        setError('Merci de remplir tous les champs.');
        return;
      }

      if (form.password.length < 8) {
        setError('Le mot de passe doit contenir au moins 8 caractères.');
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError('Les mots de passe ne correspondent pas.');
        return;
      }

      onAuthSuccess({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        provider: 'email'
      });
      onClose();
      return;
    }

    if (!form.email || !form.password) {
      setError('Adresse e-mail et mot de passe requis.');
      return;
    }

    onAuthSuccess({
      firstName: 'Apprenant',
      lastName: 'Connecté',
      email: form.email,
      provider: 'email'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-backdrop" onClick={onClose} role="presentation">
      <div className="auth-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button type="button" className="close-modal" aria-label="Fermer" onClick={onClose}>
          ×
        </button>

        <div className="auth-header">
          <img src="/deutschlogo.jpeg" alt="DEUTSCHE logo" className="auth-brand-logo" />
          <h3 id="auth-title">{title}</h3>
        </div>

        <button type="button" className="google-button" onClick={handleGoogleLogin}>
          <img src="/google-logo.svg" alt="Google" className="google-icon" />
          Continuer avec Google
        </button>

        <div className="divider"><span>ou</span></div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="input-grid compact-grid">
              <label>
                Nom
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Votre nom" />
              </label>
              <label>
                Prénom
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Votre prénom" />
              </label>
            </div>
          )}

          <label>
            Adresse mail
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" />
          </label>

          <label>
            Mot de passe
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-btn full-width">
            {mode === 'signup' ? 'Créer mon compte' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
