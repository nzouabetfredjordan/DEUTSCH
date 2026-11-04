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
