export const siteData = {
  company: 'DEUTSCHE.',
  tagline: 'Apprendre & Pratiquer l’Allemand',
  phone: '698419257',
  whatsapp: '680409437',
  email: 'startapp113@gmail.com',
  instagram: '@StartApp89',
  tiktok: '@StartApp89',
  address: 'Yaoundé, Cameroun',
  heroTitle: 'Préparez votre allemand avec des exercices pensés pour chaque niveau.',
  heroSubtitle:
    'Choisissez votre compétence, puis votre niveau A1 à C1, et accédez à une banque d’exercices progressifs pour améliorer la compréhension, l’expression et la confiance en langue allemande.',
  stats: [
    { value: '100', label: 'exercices' },
    { value: '4', label: 'compétences' },
    { value: '5', label: 'niveaux CECRL' }
  ],
  method: [
    {
      title: 'Choisissez votre compétence',
      description: 'Compréhension écrite, compréhension orale, expression écrite ou expression orale.'
    },
    {
      title: 'Sélectionnez votre niveau',
      description: 'A1, A2, B1, B2 ou C1 selon votre progression et vos objectifs.'
    },
    {
      title: 'Travaillez en autonomie',
      description: 'Accédez à des entraînements ciblés, structurés, progressifs et motivants.'
    },
    {
      title: 'Progressez concrètement',
      description: 'Restez motivé grâce à des exercices pratiques inspirés du quotidien et de l’examen.'
    }
  ],
  process: [
    'Diagnostic rapide de votre niveau',
    'Choix d’une compétence précise',
    'Sélection du niveau A1 à C1',
    'Exercices guidés et progressifs'
  ],
  showcase: [
    { title: 'Compréhension écrite', category: 'Lecture / vocabulaire', accent: '#d4af37' },
    { title: 'Compréhension orale', category: 'Écoute / expression', accent: '#d72638' },
    { title: 'Expression écrite', category: 'Rédaction / structure', accent: '#cfb784' }
  ]
};

export const skillOptions = [
  { id: 'reading', label: 'Compréhension écrite', icon: '📖' },
  { id: 'listening', label: 'Compréhension orale', icon: '🎧' },
  { id: 'writing', label: 'Expression écrite', icon: '✍️' },
  { id: 'speaking', label: 'Expression orale', icon: '🗣️' }
];

export const levelOptions = ['A1', 'A2', 'B1', 'B2', 'C1'];
export const examOptions = ['All', 'Goethe', 'TELC', 'ÖSD', 'ECL'];

const exerciseTemplates = {
  reading: [
    'Lecture de texte et vocabulaire',
    'Compléter un dialogue écrit',
    'Identifier le bon sens d’un message',
    'Choisir la bonne réponse',
    'Réécrire une idée avec précision'
  ],
  listening: [
    'Écoute courte et compréhension',
    'Associer une phrase à un son',
    'Trouver l’information clé',
    'Comprendre une consigne orale',
    'Repérer l’intention de l’interlocuteur'
  ],
  writing: [
    'Rédiger une carte postale',
    'Décrire une situation quotidienne',
    'Écrire une demande simple',
    'Produire un message personnalisé',
    'Organiser une idée en texte cohérent'
  ],
  speaking: [
    'Présenter une personne',
    'Décrire un lieu ou une routine',
    'Exprimer une préférence',
    'Répondre à une question spontanée',
    'Développer une opinion courte'
  ]
};

export const exerciseCatalog = levelOptions.flatMap((level) =>
  skillOptions.flatMap((skill) =>
    Array.from({ length: 5 }, (_, index) => ({
      id: `${skill.id}-${level}-${index + 1}`,
      skill: skill.id,
      skillLabel: skill.label,
      level,
      title: `${exerciseTemplates[skill.id][index]} – ${level}`,
      task: `Exercice ${index + 1} · ${skill.label} · Niveau ${level}`,
      prompt: `Réussissez cet exercice de ${skill.label.toLowerCase()} au niveau ${level}.`,
      duration: `${15 + index * 5} min`,
      focus: ['Vocabulaire', 'Grammaire', 'Mémorisation', 'Conjugaison', 'Compréhension'][index % 5]
    }))
  )
);

export const adminCredentials = {
  username: 'admin',
  password: '123456'
};

export const initialLearners = [
  { id: 1, name: 'Amina', surname: 'Ndjock', email: 'amina@deutsch.app', status: 'actif', connected: true, progress: 82, level: 'B1', skill: 'Compréhension orale' },
  { id: 2, name: 'Kevin', surname: 'Mouafo', email: 'kevin@deutsch.app', status: 'actif', connected: false, progress: 68, level: 'A2', skill: 'Expression écrite' },
  { id: 3, name: 'Sonia', surname: 'Tchou', email: 'sonia@deutsch.app', status: 'désactivé', connected: false, progress: 44, level: 'A1', skill: 'Compréhension écrite' },
  { id: 4, name: 'Daniel', surname: 'Kouassi', email: 'daniel@deutsch.app', status: 'actif', connected: true, progress: 91, level: 'C1', skill: 'Expression orale' },
  { id: 5, name: 'Mireille', surname: 'Nono', email: 'mireille@deutsch.app', status: 'actif', connected: false, progress: 57, level: 'B2', skill: 'Compréhension écrite' }
];

export const examSourceLibrary = {
  official: [
    {
      exam: 'Goethe',
      priority: 'Haute',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1'],
      skills: ['Reading', 'Listening', 'Writing', 'Speaking'],
      url: 'https://www.goethe.de/ins/fr/fr/spr/prf.html',
      description: 'Entraînements officiels et fiches de préparation des examens Goethe de A1 à C1.',
      role: 'Référence structurelle'
    },
    {
      exam: 'TELC',
      priority: 'Haute',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1'],
      skills: ['Reading', 'Listening', 'Writing', 'Speaking'],
      url: 'https://www.telc.net/en/exams.html',
      description: 'Formats, durées, types de tâches et exercices de préparation officiels par niveau.',
      role: 'Calibrage des formats d’examen'
    },
    {
      exam: 'ÖSD',
      priority: 'Haute',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1'],
      skills: ['Reading', 'Listening', 'Writing', 'Speaking'],
      url: 'https://www.oesterreichisches-sprachdiplom.at/en/downloads/',
      description: 'Modellsätze, téléchargements officiels et règles d’examen pour les niveaux clés.',
      role: 'Exemples modèles officiels'
    },
    {
      exam: 'ECL',
      priority: 'Moyenne',
      levels: ['A2', 'B1', 'B2', 'C1'],
      skills: ['Reading', 'Listening', 'Writing', 'Speaking'],
      url: 'https://www.ecl-exam.org/',
      description: 'Le format ECL repose sur quatre modules indépendants avec seuil de 60% par module.',
      role: 'Module-by-module calibration'
    }
  ],
  community: [
    {
      name: 'Deutsch Mit Mir',
      platform: 'Telegram',
      exam: 'Goethe / TELC / ÖSD',
      url: 'https://t.me/deutschmitmir',
      description: 'Groupes utiles pour observer les thèmes récurrents et les difficultés des apprenants.',
      priority: 'Moyenne'
    },
    {
      name: 'Prüfung Goethe / ÖSD / telc A1-C1',
      platform: 'Telegram',
      exam: 'Goethe / TELC / ÖSD',
      url: 'https://t.me/pruefungdeutsch',
      description: 'Observations de besoins réels, erreurs fréquentes et types de tâches demandés.',
      priority: 'Moyenne'
    },
    {
      name: 'Deutsch Prüfungsvorbereitung',
      platform: 'Telegram',
      exam: 'TELC / Goethe / DTB',
      url: 'https://t.me/deutsch_pruefungsvorbereitung',
      description: 'Très utile pour repérer les thèmes de vocabulaire et les niveaux de difficulté.',
      priority: 'Moyenne'
    },
    {
      name: 'Allemand Sans Fautes',
      platform: 'WhatsApp',
      exam: 'Général',
      url: 'https://chat.whatsapp.com/',
      description: 'Canal de discussion pour comprendre les erreurs concrètes et les contenus recherchés.',
      priority: 'Faible'
    }
  ]
};

export const examMatrix = [
  { exam: 'Goethe', level: 'A1', skill: 'Reading', taskType: 'Leseverstehen', difficulty: 1 },
  { exam: 'Goethe', level: 'A2', skill: 'Listening', taskType: 'Hörverstehen', difficulty: 2 },
  { exam: 'Goethe', level: 'B1', skill: 'Writing', taskType: 'Schreiben', difficulty: 3 },
  { exam: 'Goethe', level: 'B2', skill: 'Speaking', taskType: 'Sprechen', difficulty: 4 },
  { exam: 'TELC', level: 'A1', skill: 'Reading', taskType: 'Teil 1', difficulty: 1 },
  { exam: 'TELC', level: 'B1', skill: 'Listening', taskType: 'Teil 2', difficulty: 3 },
  { exam: 'TELC', level: 'B2', skill: 'Writing', taskType: 'Schreiben', difficulty: 4 },
  { exam: 'TELC', level: 'C1', skill: 'Speaking', taskType: 'Mündliche Prüfung', difficulty: 5 },
  { exam: 'ÖSD', level: 'A2', skill: 'Reading', taskType: 'Modellsatz', difficulty: 2 },
  { exam: 'ÖSD', level: 'B1', skill: 'Writing', taskType: 'Schreiben', difficulty: 3 },
  { exam: 'ÖSD', level: 'B2', skill: 'Listening', taskType: 'Hörverstehen', difficulty: 4 },
  { exam: 'ECL', level: 'B1', skill: 'Reading', taskType: 'Module Reading', difficulty: 3 },
  { exam: 'ECL', level: 'B2', skill: 'Writing', taskType: 'Module Writing', difficulty: 4 },
  { exam: 'ECL', level: 'C1', skill: 'Speaking', taskType: 'Module Speaking', difficulty: 5 }
];
