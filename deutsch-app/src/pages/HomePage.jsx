import { siteData } from '../data/siteData';
import SectionTitle from '../components/SectionTitle';
import AnimatedBackground from '../components/AnimatedBackground';

const valueCards = [
  { title: 'Cours magistraux / vocabulaire', detail: 'Vocabulaire, révision, structures clés', icon: '01' },
  { title: 'Compréhension écrite', detail: 'Lecture ciblée et textes progressifs', icon: '02' },
  { title: 'Compréhension orale', detail: 'Écoute active et réponse rapide', icon: '03' },
  { title: 'Expression écrite', detail: 'Rédaction claire et cohérente', icon: '04' },
  { title: 'Expression orale', detail: 'Confiance, fluidité et spontanéité', icon: '05' }
];

export default function HomePage({ navigate, language = 'fr', onOpenAuth }) {
  const isGerman = language === 'de';

  const heroTitle = isGerman
    ? 'Deutsch lernen mit einem klaren und attraktiven Lernpfad.'
    : siteData.heroTitle;

  const heroSubtitle = isGerman
    ? 'Wähle dein Niveau, deine Kompetenz und starte mit einem Lernsystem, das Fortschritte sichtbar macht.'
    : siteData.heroSubtitle;

  return (
    <>
      <section className="hero-section telc-hero">
        <AnimatedBackground />
        <div className="container hero-grid telc-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow">{isGerman ? 'Deutschvorbereitung' : 'Préparation allemande'}</span>
            <h1>{heroTitle}</h1>
            <p>{heroSubtitle}</p>
            <div className="cta-row">
              <button type="button" className="primary-btn" onClick={() => onOpenAuth?.('signup')}>
                {isGerman ? 'Registrieren' : 'S’inscrire'}
              </button>
              <button type="button" className="secondary-btn" onClick={() => onOpenAuth?.('login')}>
                {isGerman ? 'Anmelden' : 'Se connecter'}
              </button>
            </div>

            <div className="mini-contact">
              <span>{isGerman ? '100 Übungen' : '100 exercices'}</span>
              <span>•</span>
              <span>{isGerman ? 'A1 bis C1' : 'A1 à C1'}</span>
              <span>•</span>
              <span>{isGerman ? 'Mehr Klarheit' : 'Plus de clarté'}</span>
            </div>
          </div>

          <div className="hero-showcase reveal">
            <div className="showcase-visual" aria-label="Mise en avant apprentissage" />
            <div className="showcase-floating-card top-card">
              <span className="mini-badge">+32%</span>
              <strong>{isGerman ? 'Mehr Fortschritt' : 'Plus de progression'}</strong>
            </div>
            <div className="showcase-floating-card bottom-card">
              <span>{isGerman ? 'Aktive Lernenden' : 'Apprenants actifs'}</span>
              <strong>1.2K</strong>
            </div>
            <div className="showcase-stat-strip">
              <div>
                <strong>100+</strong>
                <span>{isGerman ? 'Übungen' : 'exercices'}</span>
              </div>
              <div>
                <strong>5</strong>
                <span>{isGerman ? 'Niveaus' : 'niveaux'}</span>
              </div>
              <div>
                <strong>4</strong>
                <span>{isGerman ? 'Funktionen' : 'fonctions'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap telc-section alt-bg">
        <div className="container">
          <SectionTitle
            eyebrow={isGerman ? 'Warum DEUTSCH' : 'Pourquoi DEUTSCH'}
            title={isGerman ? 'Ein Lernsystem mit einer klaren Bank-ähnlichen Premium-Struktur' : 'Un système d’apprentissage avec une structure premium, claire et rassurante'}
            text={isGerman ? 'Unsere Lernmethodik kombiniert Praxis, Klarheit und Progression, damit jeder Lernende mit Vertrauen und Präzision vorankommt.' : 'Notre méthode combine pratique, clarté et progression, pour accompagner chaque apprenant avec confiance et précision.'}
          />
          <div className="value-grid reveal">
            {valueCards.map((card) => (
              <article key={card.title} className="feature-card home-feature-card">
                <span className="card-icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap telc-section">
        <div className="container">
          <SectionTitle
            eyebrow={isGerman ? 'Methode' : 'Méthode'}
            title={isGerman ? 'Ein klarer Weg von A1 bis C1' : 'Un parcours clair de A1 à C1'}
            text={isGerman ? 'Jeder Schritt ist so geplant, dass sich Lernende mit logischer Reihenfolge und motivierenden Übungen weiterentwickeln.' : 'Chaque étape est pensée pour aider les apprenants à avancer dans un ordre logique, avec des exercices motivants et faciles à suivre.'}
          />
          <div className="process-grid telc-process">
            {siteData.process.map((step, index) => (
              <div key={step} className="process-item reveal">
                <span className="step-number">0{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap telc-section alt-bg">
        <div className="container">
          <SectionTitle eyebrow={isGerman ? 'Kompetenzen' : 'Compétences'} title={isGerman ? 'Trainiere alle wichtigen Sprachbereiche' : 'Entraîne chaque compétence clé'} />
          <div className="cards-grid three-up modern-showcase">
            {[
              { title: 'Cours magistraux / vocabulaire', category: 'Base & vocabulaire', accent: '#d4af37', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80' },
              { title: 'Compréhension écrite', category: 'Lecture / vocabulaire', accent: '#d72638', image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80' },
              { title: 'Compréhension orale', category: 'Écoute / expression', accent: '#111111', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80' },
              { title: 'Expression écrite', category: 'Rédaction / structure', accent: '#a67b2b', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80' },
              { title: 'Expression orale', category: 'Parole / confiance', accent: '#d72638', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80' }
            ].map((work) => (
              <article key={work.title} className="showcase-card reveal telc-showcase" style={{ '--accent': work.accent }}>
                <img src={work.image} alt={work.title} className="showcase-image" />
                <div className="showcase-header">
                  <span>{work.category}</span>
                  <span className="dot" />
                </div>
                <h3>{work.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
