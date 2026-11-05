import { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { levelOptions, skillOptions, initialLearners } from '../data/siteData';

const skillQuestionTemplates = {
  reading: [
    { type: 'qcm', question: 'Was bedeutet „Danke“ auf Deutsch?', options: ['Merci', 'Danke', 'Bonjour', 'Bonsoir'], answer: 'Danke', explanation: '„Danke“ bedeutet „merci“.' },
    { type: 'qcm', question: 'Wie sagt man „maison“ auf Deutsch?', options: ['Haus', 'Stadt', 'Buch', 'Schule'], answer: 'Haus', explanation: '„Haus“ bedeutet maison.' },
    { type: 'reponse', question: 'Vervollständige: Ich ___ Deutsch.', answer: 'spreche', explanation: 'Die richtige Form ist „spreche“.' },
    { type: 'texte', passage: 'Marta geht jeden Morgen zur Schule. Sie liest gern kurze Texte und spricht mit ihren Freunden.', question: 'Was macht Marta jeden Morgen?', answer: 'Sie geht zur Schule.', explanation: 'Der Text sagt aus, dass sie jeden Morgen zur Schule geht.' },
    { type: 'qcm', question: 'Welches Wort passt zu „Buch“?', options: ['Livre', 'Maison', 'Enseignant', 'Ville'], answer: 'Livre', explanation: '„Buch“ bedeutet livre.' },
    { type: 'reponse', question: 'Was ist das Gegenteil von „groß“?', answer: 'klein', explanation: 'Das Gegenteil von „groß“ ist „klein“.' },
    { type: 'qcm', question: 'Welche Antwort ist richtig?', options: ['Ich bin müde.', 'Ich bin sehr klein.', 'Ich bin Schule.', 'Ich bin Tasche.'], answer: 'Ich bin müde.', explanation: 'Das ist eine korrekte deutschsprachige Aussage.' },
    { type: 'texte', passage: 'Am Freitag besucht Lukas seine Großeltern. Danach geht er mit Freunden in den Park.', question: 'Was macht Lukas am Freitag?', answer: 'Er besucht seine Großeltern und geht danach in den Park.', explanation: 'Der Text beschreibt seine Aktivitäten.' },
    { type: 'reponse', question: 'Übersetze: Je vais au travail.', answer: 'Ich gehe zur Arbeit.', explanation: 'Die korrekte Übersetzung lautet „Ich gehe zur Arbeit“.' },
    { type: 'qcm', question: 'Welche Lösung passt zu „Schule“?', options: ['école', 'maison', 'voiture', 'argent'], answer: 'école', explanation: '„Schule“ bedeutet école.' }
  ],
  listening: [
    { type: 'oral', question: 'Wähle die richtige Bedeutung für: „Ich bin müde“.', options: ['Je suis fatigué', 'Je suis heureux', 'Je vais travailler', 'Je mange bien'], answer: 'Je suis fatigué', prompt: 'Je suis fatigué' },
    { type: 'qcm', question: 'Welches Wort hörst du?', options: ['Haus', 'Schule', 'Buch', 'Auto'], answer: 'Schule', explanation: 'Das Wort ist „Schule“.' },
    { type: 'reponse', question: 'Wie antwortet man auf: Wie alt bist du?', answer: 'Ich bin 18 Jahre alt.', explanation: 'Die Antwort gibt das Alter an.' },
    { type: 'oral', question: 'Welche Antwort passt zu: „Wo wohnst du?“', options: ['Ich wohne in Yaoundé.', 'Ich trinke Wasser.', 'Ich gehe nach Hause.', 'Ich bin krank.'], answer: 'Ich wohne in Yaoundé.', prompt: 'Ich wohne in Yaoundé.' },
    { type: 'qcm', question: 'Was bedeutet „Freund“?', options: ['ami', 'maison', 'école', 'route'], answer: 'ami', explanation: '„Freund“ bedeutet ami.' },
    { type: 'reponse', question: 'Antworten Sie: Was machst du gern am Wochenende?', answer: 'Ich gehe gern mit Freunden spazieren.', explanation: 'Die Antwort beschreibt eine typische Freizeitaktivität.' },
    { type: 'oral', question: 'Was bedeutet „Ich habe heute viel gearbeitet“?', options: ['J’ai beaucoup travaillé aujourd’hui', 'Je travaille demain', 'Je dors beaucoup', 'Je suis en vacances'], answer: 'J’ai beaucoup travaillé aujourd’hui', prompt: 'J’ai beaucoup travaillé aujourd’hui' },
    { type: 'qcm', question: 'Was bedeutet „Vorbereitung“?', options: ['préparation', 'départ', 'retour', 'vacances'], answer: 'préparation', explanation: '„Vorbereitung“ bedeutet préparation.' },
    { type: 'reponse', question: 'Vervollständige: Wir sollten ___, bevor wir entscheiden.', answer: 'nachdenken', explanation: 'Das passende Verb ist „nachdenken“.' },
    { type: 'oral', question: 'Welche Bedeutung hat: „Es ist nicht leicht, diese Entscheidung zu treffen“?', options: ['Il n’est pas facile de prendre cette décision', 'La décision est simple', 'Il faut partir', 'Tout va bien'], answer: 'Il n’est pas facile de prendre cette décision', prompt: 'Il n’est pas facile de prendre cette décision' }
  ],
  writing: [
    { type: 'reponse', question: 'Schreibe einen Satz über deine Familie.', answer: 'Ich habe eine Familie. Meine Mutter ist freundlich.', explanation: 'Eine einfache, klare Antwort ist gut.' },
    { type: 'qcm', question: 'Welche Form ist richtig?', options: ['Ich bin Lehrer.', 'Ich bin ein Lehrer.', 'Ich bin Lehrerin.', 'Ich Lehrer.'], answer: 'Ich bin Lehrer.', explanation: 'Das ist die natürlichste Form.' },
    { type: 'texte', passage: 'Heute ist Montag. Ich gehe zur Schule und lerne Deutsch.', question: 'Was macht er heute?', answer: 'Er geht zur Schule und lernt Deutsch.', explanation: 'Der Text zeigt genau das.' },
    { type: 'reponse', question: 'Schreibe einen kurzen Satz über das Wochenende.', answer: 'Am Wochenende gehe ich mit Freunden spazieren und lese ein Buch.', explanation: 'Die Antwort ist klar und korrekt.' },
    { type: 'qcm', question: 'Was ist das richtige Wort für „mai“?', options: ['Mai', 'Juli', 'März', 'Januar'], answer: 'Mai', explanation: '„Mai“ ist genau das Wort für mai.' },
    { type: 'texte', passage: 'Im Park spielt sie mit ihren Kindern. Danach gehen sie nach Hause und kochen zusammen.', question: 'Was machen sie nach dem Park?', answer: 'Sie gehen nach Hause und kochen zusammen.', explanation: 'Das ist in dem Text beschrieben.' },
    { type: 'reponse', question: 'Formuliere einen Wunsch auf Deutsch.', answer: 'Ich möchte mehr Deutsch sprechen.', explanation: 'Das ist eine klare Formulierung.' },
    { type: 'qcm', question: 'Welche Antwort ist korrekt?', options: ['Ich habe mich auf die Prüfung vorbereitet.', 'Ich habe mich vorbereit auf die Prüfung.', 'Ich habe mich Prüfung vorbereitet.', 'Ich habe die Prüfung vorbereitet mich.'], answer: 'Ich habe mich auf die Prüfung vorbereitet.', explanation: 'Diese Form ist grammatisch korrekt.' },
    { type: 'texte', passage: 'Die Gruppe hat eine neue Strategie entwickelt, weil die erste Methode nicht funktioniert hat.', question: 'Warum änderten sie die Methode?', answer: 'Weil die erste Methode nicht funktioniert hat.', explanation: 'Das steht im Text.' },
    { type: 'reponse', question: 'Schreibe eine kurze Meinung über Online-Lernen.', answer: 'Online lernen ist praktisch, weil man flexibel arbeiten kann.', explanation: 'Die Antwort ist klar und verständlich.' }
  ],
  speaking: [
    { type: 'oral', question: 'Stelle dich mit zwei Sätzen auf Deutsch vor.', options: ['Ich heiße Paul und bin 20 Jahre alt.', 'Ich arbeite zu Hause.', 'Ich will schlafen.', 'Ich komme aus Paris.'], answer: 'Ich heiße Paul und bin 20 Jahre alt.', prompt: 'Ich heiße Paul und bin 20 Jahre alt.' },
    { type: 'qcm', question: 'Welcher Gruß passt zum Morgen?', options: ['Guten Morgen', 'Guten Abend', 'Ich bin hier', 'Danke'], answer: 'Guten Morgen', explanation: 'Das ist der richtige morgendliche Gruß.' },
    { type: 'reponse', question: 'Antworten Sie: Wo wohnst du?', answer: 'Ich wohne in Yaoundé.', explanation: 'Die Antwort nennt den Wohnort.' },
    { type: 'oral', question: 'Beschreibe deine tägliche Routine auf Deutsch.', options: ['Ich stehe auf, frühstücke und gehe arbeiten.', 'Ich schlafe den ganzen Tag.', 'Ich esse nur am Abend.', 'Ich mache nichts.'], answer: 'Ich stehe auf, frühstücke und gehe arbeiten.', prompt: 'Ich stehe auf, frühstücke und gehe arbeiten.' },
    { type: 'qcm', question: 'Welche Antwort passt zu „Wie geht es dir?“', options: ['Es geht mir gut, danke.', 'Ich gehe zur Arbeit.', 'Ich bin in der Schule.', 'Guten Tag!'], answer: 'Es geht mir gut, danke.', explanation: 'Das ist die passende Antwort.' },
    { type: 'reponse', question: 'Erzähle von deinem Lieblingsjob.', answer: 'Mein Lieblingsjob ist Lehrer, weil er interessant ist.', explanation: 'Die Antwort ist logisch und verständlich.' },
    { type: 'oral', question: 'Erkläre, warum du Deutsch lernen möchtest.', options: ['Weil es für Reisen und Arbeit nützlich ist.', 'Weil ich es nicht mag.', 'Weil es leicht ist.', 'Weil ich schlafen will.'], answer: 'Weil es für Reisen und Arbeit nützlich ist.', prompt: 'Weil es für Reisen und Arbeit nützlich ist.' },
    { type: 'qcm', question: 'Welche Aussage ist eine Meinung?', options: ['Ich finde Deutsch interessant.', 'Ich bin in der Schule.', 'Ich habe ein Buch.', 'Ich trinke Wasser.'], answer: 'Ich finde Deutsch interessant.', explanation: 'Das ist eine klare Meinung.' },
    { type: 'reponse', question: 'Beschreibe ein zukünftiges Projekt.', answer: 'In Zukunft möchte ich in Deutschland studieren.', explanation: 'Die Zukunft wird klar ausgedrückt.' },
    { type: 'oral', question: 'Gib deine Meinung zur Bedeutung der deutschen Sprache.', options: ['Sie ist für Studien und internationale Chancen wichtig.', 'Sie ist nutzlos.', 'Ich mag sie nicht.', 'Ich spreche nicht darüber.'], answer: 'Sie ist für Studien und internationale Chancen wichtig.', prompt: 'Sie ist für Studien und internationale Chancen wichtig.' }
  ]
};

const generateExercises = () => {
  const result = [];
  skillOptions.forEach((skill) => {
    const questions = skillQuestionTemplates[skill.id] || [];
    levelOptions.forEach((level) => {
      questions.forEach((question, index) => {
        result.push({
          id: `${skill.id}-${level}-${index}`,
          skill: skill.id,
          label: skill.label,
          level,
          ...question
        });
      });
    });
  });
  return result;
};

export default function ServicesPage({ language = 'fr', onTrackedUserAdd }) {
  const isGerman = language === 'de';
  const [selectedSkill, setSelectedSkill] = useState('reading');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [sessionResults, setSessionResults] = useState([]);
  const [assessmentForm, setAssessmentForm] = useState({ name: '', email: '', level: 'A1' });
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [assessmentAnswer, setAssessmentAnswer] = useState('');
  const [assessmentFeedback, setAssessmentFeedback] = useState(null);
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [assessmentError, setAssessmentError] = useState('');
  const [assessmentResults, setAssessmentResults] = useState([]);

  const exercises = useMemo(() => generateExercises(), []);

  const filteredExercises = useMemo(
    () => exercises.filter((exercise) => exercise.skill === selectedSkill && exercise.level === selectedLevel),
    [exercises, selectedLevel, selectedSkill]
  );

  const currentExercise = filteredExercises[currentIndex] || null;
  const totalAvailable = filteredExercises.length;
  const progress = totalAvailable ? Math.round((currentIndex / totalAvailable) * 100) : 0;
  const successRate = sessionResults.length ? Math.round((sessionResults.filter((result) => result.isCorrect).length / sessionResults.length) * 100) : 0;

  const normalize = (value) => String(value ?? '').trim().toLowerCase();

  const handleAnswerSubmit = (selectedValue) => {
    if (!currentExercise || showReview) return;

    const answerToCheck = selectedValue ?? answer;
    const normalizedUser = normalize(answerToCheck);
    const normalizedReal = normalize(currentExercise.answer);
    const isCorrect = normalizedUser === normalizedReal;

    const feedback = {
      id: `${currentExercise.id}-${Date.now()}`,
      question: currentExercise.question || currentExercise.task || currentExercise.prompt,
      userAnswer: answerToCheck ? String(answerToCheck).trim() : 'Aucune réponse',
      expectedAnswer: String(currentExercise.answer).trim(),
      explanation: currentExercise.explanation || 'La correction montre la bonne formulation et la logique attendue.',
      isCorrect,
      skill: currentExercise.label,
      level: currentExercise.level
    };

    setCurrentFeedback(feedback);
    setSessionResults((prev) => [...prev, feedback]);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setShowReview(true);
  };

  const advanceExercise = () => {
    if (currentIndex < totalAvailable - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswer('');
      setCurrentFeedback(null);
      setShowReview(false);
      return;
    }

    setCompleted(true);
    setCurrentFeedback(null);
    setShowReview(false);
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setCompleted(false);
    setAnswer('');
    setShowReview(false);
    setCurrentFeedback(null);
    setSessionResults([]);
  };

  const handleSkillChange = (skillId) => {
    setSelectedSkill(skillId);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setCompleted(false);
    setAnswer('');
    setShowReview(false);
    setCurrentFeedback(null);
    setSessionResults([]);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setCompleted(false);
    setAnswer('');
    setShowReview(false);
    setCurrentFeedback(null);
    setSessionResults([]);
  };

  const learners = initialLearners.slice(0, 4);

  const startAssessment = () => {
    if (!assessmentForm.name.trim() || !assessmentForm.email.trim()) {
      setAssessmentError(isGerman ? 'Veuillez renseigner votre nom et votre e-mail.' : 'Veuillez renseigner votre nom et votre e-mail.');
      return;
    }

    const pool = generateExercises().filter((exercise) => exercise.level === assessmentForm.level);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);

    if (shuffled.length === 0) {
      setAssessmentError(isGerman ? 'Aucune question disponible pour ce niveau.' : 'Aucune question disponible pour ce niveau.');
      return;
    }

    onTrackedUserAdd?.({
      firstName: assessmentForm.name.trim(),
      lastName: '',
      email: assessmentForm.email.trim(),
      level: assessmentForm.level,
      skill: 'Test gratuit',
      progress: 0,
      status: 'actif',
      connected: true,
      provider: 'manual'
    });

    setAssessmentQuestions(shuffled);
    setAssessmentIndex(0);
    setAssessmentAnswer('');
    setAssessmentFeedback(null);
    setAssessmentScore(0);
    setAssessmentStarted(true);
    setAssessmentCompleted(false);
    setAssessmentError('');
    setAssessmentResults([]);
  };

  const currentAssessmentQuestion = assessmentQuestions[assessmentIndex] || null;
  const isAssessmentAnswerCorrect = (value) => normalize(value) === normalize(currentAssessmentQuestion?.answer || '');

  const submitAssessmentAnswer = () => {
    if (!currentAssessmentQuestion || assessmentFeedback) return;

    const userAnswer = assessmentAnswer.trim();
    const isCorrect = isAssessmentAnswerCorrect(userAnswer);
    const result = {
      id: `${currentAssessmentQuestion.id}-${Date.now()}`,
      question: currentAssessmentQuestion.question || currentAssessmentQuestion.task || currentAssessmentQuestion.prompt,
      userAnswer: userAnswer || 'Aucune réponse',
      expectedAnswer: String(currentAssessmentQuestion.answer).trim(),
      explanation: currentAssessmentQuestion.explanation || 'La bonne réponse est la plus précise selon le contexte.',
      isCorrect
    };

    if (isCorrect) {
      setAssessmentScore((prev) => prev + 1);
    }

    setAssessmentResults((prev) => [...prev, result]);
    setAssessmentFeedback(result);
  };

  const nextAssessmentQuestion = () => {
    if (!assessmentFeedback) return;

    const isLast = assessmentIndex === assessmentQuestions.length - 1;

    if (isLast) {
      setAssessmentCompleted(true);
      setAssessmentStarted(false);
      setAssessmentAnswer('');
      setAssessmentFeedback(null);
      return;
    }

    setAssessmentIndex((prev) => prev + 1);
    setAssessmentAnswer('');
    setAssessmentFeedback(null);
  };

  const resetAssessment = () => {
    setAssessmentQuestions([]);
    setAssessmentIndex(0);
    setAssessmentAnswer('');
    setAssessmentFeedback(null);
    setAssessmentScore(0);
    setAssessmentStarted(false);
    setAssessmentCompleted(false);
    setAssessmentError('');
    setAssessmentResults([]);
  };

  return (
    <main className="page-shell exercise-page-shell">
      <div className="container exercise-shell">
        <section className="exercise-hero reveal">
          <div className="exercise-hero-copy">
            <span className="eyebrow">{isGerman ? 'Lernplattform' : 'Plateforme d’entraînement'}</span>
            <h1>{isGerman ? 'Eine Premium-Vorbereitung zum Fortschritt im Deutschlernen.' : 'Une préparation premium pour progresser en allemand.'}</h1>
            <p>
              {isGerman
                ? 'Dutzende strukturierte Übungen, sofortige Korrekturen und eine spürbare Progression bei jeder Sitzung.'
                : 'Des dizaines d’exercices structurés, des corrections instantanées et une progression visible à chaque séance.'}
            </p>
            <div className="cta-row">
              <button type="button" className="primary-btn" onClick={startAssessment}>{isGerman ? 'Test starten' : 'Lancer un test'}</button>
              <button type="button" className="secondary-btn">{isGerman ? 'Meine Fortschritte' : 'Voir mes progrès'}</button>
            </div>
          </div>

          <div className="exercise-hero-panel">
            <div className="hero-stat-box highlight">
              <span className="mini-badge">+38%</span>
              <strong>{isGerman ? 'Durchschnittlicher Fortschritt' : 'Progression moyenne'}</strong>
            </div>
            <div className="exercise-hero-avatars">
              {learners.map((learner, index) => (
                <div key={learner.id} className="avatar-bubble" style={{ animationDelay: `${index * 0.2}s` }}>
                  {learner.name.charAt(0)}
                </div>
              ))}
            </div>
            <div className="hero-stat-box dark-box">
              <span>{isGerman ? 'Aktive Lernende' : 'Apprenants actifs'}</span>
              <strong>{learners.length + 2}</strong>
            </div>
          </div>
        </section>

        <div className="exercise-metrics reveal">
          <div className="metric-card">
            <span>{isGerman ? 'Übungen' : 'Exercices'}</span>
            <strong>100+</strong>
          </div>
          <div className="metric-card">
            <span>{isGerman ? 'Fähigkeiten' : 'Compétences'}</span>
            <strong>04</strong>
          </div>
          <div className="metric-card">
            <span>{isGerman ? 'Niveaus' : 'Niveaux'}</span>
            <strong>A1-C1</strong>
          </div>
          <div className="metric-card">
            <span>{isGerman ? 'Korrektur' : 'Correction'}</span>
            <strong>2 {isGerman ? 'Sätze' : 'phrases'}</strong>
          </div>
        </div>

        {!assessmentCompleted && !assessmentStarted && (
          <div className="assessment-form reveal">
            <div className="assessment-head">
              <h3>{isGerman ? 'Kostenloses Niveau-Assessment' : 'Test de niveau gratuit'}</h3>
              <span>{isGerman ? '5 Fragen • 1 minute' : '5 questions • 1 minute'}</span>
            </div>
            <div className="assessment-fields">
              <label>
                {isGerman ? 'Nom complet' : 'Nom complet'}
                <input
                  value={assessmentForm.name}
                  onChange={(event) => setAssessmentForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder={isGerman ? 'Votre nom' : 'Votre nom'}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={assessmentForm.email}
                  onChange={(event) => setAssessmentForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="name@example.com"
                />
              </label>
              <label>
                {isGerman ? 'Niveau' : 'Niveau'}
                <select
                  value={assessmentForm.level}
                  onChange={(event) => setAssessmentForm((current) => ({ ...current, level: event.target.value }))}
                >
                  {levelOptions.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </label>
            </div>
            {assessmentError && <p className="error-message">{assessmentError}</p>}
            <button type="button" className="primary-btn" onClick={startAssessment}>
              {isGerman ? 'Test starten' : 'Lancer le test'}
            </button>
          </div>
        )}

        {assessmentStarted && currentAssessmentQuestion && !assessmentCompleted && (
          <div className="assessment-panel reveal">
            <div className="assessment-head">
              <h3>{isGerman ? 'Test de niveau' : 'Test de niveau'}</h3>
              <span>
                {assessmentIndex + 1}/{assessmentQuestions.length}
              </span>
            </div>
            <p className="assessment-question">{currentAssessmentQuestion.question}</p>
            {currentAssessmentQuestion.type === 'qcm' && (
              <div className="option-list">
                {currentAssessmentQuestion.options.map((option) => (
                  <button key={option} type="button" className="option-btn" onClick={() => {
                    const isCorrect = normalize(option) === normalize(currentAssessmentQuestion.answer);
                    const result = {
                      id: `${currentAssessmentQuestion.id}-${Date.now()}`,
                      userAnswer: option,
                      expectedAnswer: currentAssessmentQuestion.answer,
                      explanation: currentAssessmentQuestion.explanation || '',
                      isCorrect
                    };

                    setAssessmentAnswer(option);
                    setAssessmentResults((prev) => [...prev, result]);
                    setAssessmentFeedback(result);

                    if (isCorrect) {
                      setAssessmentScore((prev) => prev + 1);
                    }
                  }}>
                    {option}
                  </button>
                ))}
              </div>
            )}
            {(currentAssessmentQuestion.type === 'reponse' || currentAssessmentQuestion.type === 'texte') && (
              <div className="answer-block">
                <textarea value={assessmentAnswer} onChange={(event) => setAssessmentAnswer(event.target.value)} rows="4" placeholder={isGerman ? 'Réponse...' : 'Réponse...'} />
                <button type="button" className="primary-btn" onClick={submitAssessmentAnswer}>
                  {isGerman ? 'Antwort prüfen' : 'Vérifier'}
                </button>
              </div>
            )}
            {assessmentFeedback && (
              <div className="exercise-feedback assessment-feedback">
                <div className={`feedback-badge ${assessmentFeedback.isCorrect ? 'success' : 'warning'}`}>
                  {assessmentFeedback.isCorrect ? (isGerman ? 'Bonne réponse' : 'Bonne réponse') : (isGerman ? 'À revoir' : 'À revoir')}
                </div>
                <div className="feedback-copy">
                  <p><strong>{isGerman ? 'Votre réponse' : 'Votre réponse'} :</strong> {assessmentFeedback.userAnswer}</p>
                  <p><strong>{isGerman ? 'Bonne réponse' : 'Bonne réponse'} :</strong> {assessmentFeedback.expectedAnswer}</p>
                  <p><strong>{isGerman ? 'Explication' : 'Explication'} :</strong> {assessmentFeedback.explanation}</p>
                </div>
                <button type="button" className="primary-btn" onClick={nextAssessmentQuestion}>
                  {assessmentIndex === assessmentQuestions.length - 1 ? (isGerman ? 'Voir le score' : 'Voir le score') : (isGerman ? 'Question suivante' : 'Question suivante')}
                </button>
              </div>
            )}
          </div>
        )}

        {assessmentCompleted && (
          <div className="assessment-result reveal">
            <h3>{isGerman ? 'Résultat du test' : 'Résultat du test'}</h3>
            <div className="final-summary">
              <div>
                <span>{isGerman ? 'Score final' : 'Score final'}</span>
                <strong>{assessmentScore}/5</strong>
              </div>
              <div>
                <span>{isGerman ? 'Taux de réussite' : 'Taux de réussite'}</span>
                <strong>{Math.round((assessmentScore / 5) * 100)}%</strong>
              </div>
            </div>
            <div className="review-list">
              {assessmentResults.map((result, index) => (
                <div key={`${result.id}-review`} className="review-item">
                  <div className="review-item-head">
                    <span>Question {index + 1}</span>
                    <span className={result.isCorrect ? 'review-pill success' : 'review-pill warning'}>
                      {result.isCorrect ? 'Réussi' : 'À revoir'}
                    </span>
                  </div>
                  <p><strong>{isGerman ? 'Question' : 'Question'} :</strong> {assessmentQuestions[index]?.question || assessmentQuestions[index]?.task || assessmentQuestions[index]?.prompt}</p>
                  <p><strong>{isGerman ? 'Bonne réponse' : 'Bonne réponse'} :</strong> {result.expectedAnswer}</p>
                  <p><strong>{isGerman ? 'Votre réponse' : 'Votre réponse'} :</strong> {result.userAnswer}</p>
                </div>
              ))}
            </div>
            <button type="button" className="primary-btn" onClick={resetAssessment}>
              {isGerman ? 'Recommencer' : 'Recommencer'}
            </button>
          </div>
        )}

        <div className="exercise-workspace">
          <div className="exercise-main-panel reveal">
            <div className="selector-panel">
              <div className="selector-block">
                <span>Compétence</span>
                <div className="chip-grid">
                  {skillOptions.map((skill) => (
                    <button
                      key={skill.id}
                      type="button"
                      className={selectedSkill === skill.id ? 'chip active' : 'chip'}
                      onClick={() => handleSkillChange(skill.id)}
                    >
                      <span>{skill.icon}</span>
                      {skill.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="selector-block">
                <span>Niveau</span>
                <div className="chip-grid level-grid">
                  {levelOptions.map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={selectedLevel === level ? 'chip active' : 'chip'}
                      onClick={() => handleLevelChange(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="scoreboard reveal">
              <div>
                <span>Progression</span>
                <strong>{progress}%</strong>
              </div>
              <div>
                <span>Questions</span>
                <strong>{Math.min(currentIndex + 1, totalAvailable)}/{totalAvailable}</strong>
              </div>
              <div>
                <span>Réussites</span>
                <strong>{correctAnswers}</strong>
              </div>
              <div>
                <span>Taux</span>
                <strong>{successRate}%</strong>
              </div>
            </div>

            {!completed && currentExercise && !showReview ? (
              <div className="exercise-practice reveal">
                <div className="exercise-header-practice">
                  <span>{currentExercise.level}</span>
                  <span>{currentExercise.label}</span>
                </div>

                <h3>{currentExercise.question}</h3>

                {currentExercise.type === 'qcm' && (
                  <div className="option-list">
                    {currentExercise.options.map((option) => (
                      <button key={option} type="button" className="option-btn" onClick={() => handleAnswerSubmit(option)}>
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {currentExercise.type === 'reponse' && (
                  <div className="answer-block">
                    <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Réponds en allemand..." rows="4" />
                    <button type="button" className="primary-btn" onClick={() => handleAnswerSubmit()}>
                      Valider la réponse
                    </button>
                  </div>
                )}

                {currentExercise.type === 'texte' && (
                  <div className="answer-block">
                    <div className="reading-box">{currentExercise.passage}</div>
                    <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Réponds à la question..." rows="4" />
                    <button type="button" className="primary-btn" onClick={() => handleAnswerSubmit()}>
                      Vérifier
                    </button>
                  </div>
                )}

                {currentExercise.type === 'oral' && (
                  <div className="answer-block">
                    <div className="oral-panel">
                      <button type="button" className="secondary-btn" onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(currentExercise.prompt || currentExercise.question))}>
                        Écouter la question
                      </button>
                      <p>{currentExercise.prompt}</p>
                    </div>
                    <div className="option-list">
                      {currentExercise.options.map((option) => (
                        <button key={option} type="button" className="option-btn" onClick={() => handleAnswerSubmit(option)}>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {showReview && currentFeedback && !completed && (
              <div className="exercise-feedback reveal">
                <div className={`feedback-badge ${currentFeedback.isCorrect ? 'success' : 'warning'}`}>
                  {currentFeedback.isCorrect ? 'Bonne réponse' : 'À revoir'}
                </div>

                <div className="feedback-grid">
                  <div>
                    <span>Votre réponse</span>
                    <strong>{currentFeedback.userAnswer}</strong>
                  </div>
                  <div>
                    <span>Réponse attendue</span>
                    <strong>{currentFeedback.expectedAnswer}</strong>
                  </div>
                </div>

                <div className="feedback-copy">
                  <p>
                    <strong>Ce que vous avez trouvé :</strong>
                    {' '}
                    {currentFeedback.isCorrect ? 'Vous avez bien identifié la bonne formulation.' : 'La réponse correcte était plus précise que votre proposition.'}
                  </p>
                  <p>
                    <strong>Ce qui aurait dû être mis :</strong>
                    {' '}
                    {currentFeedback.expectedAnswer}.
                  </p>
                  <p>
                    <strong>Explication :</strong>
                    {' '}
                    {currentFeedback.explanation}
                  </p>
                </div>

                <button type="button" className="primary-btn" onClick={advanceExercise}>
                  {currentIndex < totalAvailable - 1 ? 'Question suivante' : 'Voir le bilan final'}
                </button>
              </div>
            )}

            {!completed && !showReview && !currentExercise && (
              <div className="exercise-practice final-state reveal">
                <h3>Aucun exercice disponible</h3>
                <button type="button" className="primary-btn" onClick={resetPractice}>Réinitialiser</button>
              </div>
            )}

            {completed && (
              <div className="exercise-practice reveal final-state">
                <h3>Session terminée</h3>
                <div className="final-summary">
                  <div>
                    <span>Score final</span>
                    <strong>{correctAnswers}/{totalAvailable}</strong>
                  </div>
                  <div>
                    <span>Taux de réussite</span>
                    <strong>{successRate}%</strong>
                  </div>
                </div>

                <div className="review-list">
                  {sessionResults.map((result, index) => (
                    <div key={result.id} className="review-item">
                      <div className="review-item-head">
                        <span>Exercice {index + 1}</span>
                        <span className={result.isCorrect ? 'review-pill success' : 'review-pill warning'}>
                          {result.isCorrect ? 'Réussi' : 'À revoir'}
                        </span>
                      </div>
                      <p><strong>Question :</strong> {result.question}</p>
                      <p><strong>Votre réponse :</strong> {result.userAnswer}</p>
                      <p><strong>Bonne réponse :</strong> {result.expectedAnswer}</p>
                      <p><strong>Explication :</strong> {result.explanation}</p>
                    </div>
                  ))}
                </div>

                <button type="button" className="primary-btn" onClick={resetPractice}>
                  Recommencer
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
