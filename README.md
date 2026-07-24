# Portfolio — Mouhamed Matar Guiro

Portfolio personnel construit avec React + Vite + Tailwind CSS.

## 1. Installation

Prérequis : [Node.js](https://nodejs.org) (version 18 ou plus récente).

```bash
npm install
```

## 2. Lancer en local

```bash
npm run dev
```

Ouvrez ensuite l'adresse affichée dans le terminal (en général `http://localhost:5173`).

## 3. Personnaliser

- **Photo de profil** : dans `src/App.jsx`, cherchez le commentaire `Photo placeholder` dans la fonction `Hero`.
  Remplacez le `<div>` avec les initiales "MG" par :
  ```jsx
  <img src="/photo.jpg" className="w-28 h-28 rounded-full object-cover" alt="Mouhamed Matar Guiro" />
  ```
  Placez votre photo (`photo.jpg`) dans le dossier `public/`.

- **Liens GitHub des projets** : dans `src/App.jsx`, fonction `ProjectCard`, remplacez le bloc
  `DÉPÔT GITHUB — BIENTÔT` par un vrai lien :
  ```jsx
  <a href="https://github.com/votre-compte/votre-repo" className="mmg-tag" target="_blank" rel="noreferrer">
    VOIR SUR GITHUB →
  </a>
  ```

- **Contenu** (textes, projets, formations, compétences) : tout se trouve directement dans `src/App.jsx`,
  organisé section par section (`Hero`, `About`, `Skills`, `Projects`, `Education`, `Contact`).

## 4. Construire la version de production

```bash
npm run build
```

Cela génère un dossier `dist/` contenant le site statique final, prêt à héberger.

## 5. Déployer en ligne (gratuit)

### Option A — Netlify (le plus simple)
1. Allez sur [netlify.com](https://www.netlify.com) et créez un compte.
2. Lancez `npm run build` en local.
3. Glissez-déposez le dossier `dist/` généré sur la page d'accueil de Netlify ("Deploy manually").
4. Votre site est en ligne en quelques secondes, avec une URL fournie automatiquement.

### Option B — Vercel
1. Créez un compte sur [vercel.com](https://vercel.com).
2. Installez leur CLI : `npm i -g vercel`, puis lancez `vercel` dans ce dossier et suivez les instructions.

### Option C — GitHub Pages
1. Créez un dépôt GitHub et poussez ce projet dessus.
2. Installez le plugin : `npm install --save-dev gh-pages`
3. Ajoutez dans `package.json` :
   ```json
   "homepage": "https://votre-compte.github.io/nom-du-repo",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Lancez `npm run deploy`.

## Structure du projet

```
mmg-portfolio/
├── index.html          # Point d'entrée HTML
├── package.json         # Dépendances et scripts
├── vite.config.js        # Configuration Vite
├── tailwind.config.js     # Configuration Tailwind
├── postcss.config.js      # Configuration PostCSS
├── src/
│   ├── main.jsx          # Point d'entrée React
│   ├── App.jsx           # Composant principal du portfolio (tout le contenu est ici)
│   └── index.css         # Import de Tailwind
└── public/               # Dossier pour vos fichiers statiques (photo, favicon, etc.)
```
