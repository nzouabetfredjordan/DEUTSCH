# DEUTSCH — site web premium

Site web multi-pages en React + Vite, inspiré du style premium de référence, avec branding DEUTSCH, navigation, sections d’agence, formulaire de contact et préparation de déploiement sur Vercel.

## Informations de contact intégrées

- WhatsApp: 680409437
- Téléphone: 698419257
- Email: startapp113@gmail.com
- Instagram: @StartApp89
- TikTok: @StartApp89

## Lancer le site localement

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Puis ouvrir :

- http://localhost:5173/

## Build de production

```bash
npm run build
```

## Déploiement sur Vercel

1. Pousser ce dossier vers GitHub.
2. Créer un nouveau projet sur Vercel.
3. Importer le dépôt.
4. Sélectionner le framework Vite.
5. Déployer.

Le projet contient déjà le fichier de configuration Vercel pour le routing SPA et l’API serverless.

## Structure du projet

- src/ : pages, composants et styles du site
- public/ : logos et images statiques
- api/ : endpoint serverless pour la gestion des messages
- vercel.json : configuration Vercel
