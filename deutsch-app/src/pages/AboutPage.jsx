import SectionTitle from '../components/SectionTitle';

export default function AboutPage({ language = 'fr' }) {
  const isGerman = language === 'de';

  const steps = isGerman
    ? [
        { title: '1. Diagnose', text: 'Wir beginnen mit einer klaren Analyse des Niveaus und der zu stärkenden Kompetenz.' },
        { title: '2. Fokus', text: 'Jede Aufgabe zielt auf eine konkrete Fähigkeit ab: Lesen, Hören, Schreiben oder Sprechen.' },
        { title: '3. Fortschritt', text: 'Die Lernenden entwickeln sich logisch von A1 bis C1 mit klarer und motivierender Dynamik.' },
        { title: '4. Vertrauen', text: 'Das Ziel ist, Sicherheit, Klarheit und echte Sprachgewandtheit in jedem Schritt zu stärken.' }
      ]
    : [
        { title: '1. Diagnostic', text: 'Nous commençons par identifier la compétence à travailler et le niveau exact de l’apprenant afin d’éviter les erreurs de progression.' },
        { title: '2. Ciblage', text: 'Chaque exercice est pensé pour renforcer une capacité précise : lecture, écoute, rédaction ou prise de parole.' },
        { title: '3. Progression', text: 'L’apprenant évolue de A1 à C1 avec un parcours logique, utile et motivant, en gardant une dynamique de réussite.' },
        { title: '4. Confiance', text: 'L’objectif est simple : renforcer la compréhension, l’expression et la sécurité linguistique à chaque étape.' }
      ];

  const quote = isGerman
    ? '“Der beste Weg, Deutsch zu lernen, ist ein klarer Plan, nützliche Aufgaben und ein regelmäßiger Fortschritt.”'
    : '“La meilleure manière d’apprendre l’allemand est de travailler avec un plan clair, des tâches utiles et une progression régulière.”';

  return (
    <main className="page-shell">
      <div className="container narrow">
        <SectionTitle
          eyebrow={isGerman ? 'Methode' : 'Méthode'}
          title={isGerman ? 'Eine klare, wirksame und progressive Deutschvorbereitung' : 'Une préparation allemande structurée, efficace et progressive'}
          text={isGerman ? 'Deutschlernen wird einfacher, wenn jeder Lernende mit einem klaren Plan, realistischen Zielen und präzisen Übungen vorankommt.' : 'Apprendre l’allemand aide chaque apprenant à avancer avec méthode, en tenant compte de ses objectifs, de ses compétences et de son niveau réel.'}
        />

        <div className="about-grid">
          {steps.slice(0, 2).map((step) => (
            <div key={step.title} className="info-card reveal">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        <div className="about-grid second-row">
          {steps.slice(2).map((step) => (
            <div key={step.title} className="info-card reveal">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        <div className="quote-box reveal">
          <p>{quote}</p>
        </div>
      </div>
    </main>
  );
}
