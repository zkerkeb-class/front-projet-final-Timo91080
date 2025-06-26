
# Nom, Prénom

Dikete Timothée

# Foot-Journal ⚽

Site d'actualités football moderne avec authentification utilisateur, gestion des favoris et internationalisation complète.

## 🌟 Fonctionnalités

### Frontend (React + TypeScript)
- **🔐 Authentification complète** : Inscription, connexion, gestion de profil
- **📰 Actualités football** : Articles en temps réel avec système de catégories
- **⭐ Système de favoris avancé** : Sauvegarde avec modal de confirmation et icône poubelle
- **🌍 Internationalisation (i18n)** : Support complet français/anglais avec changement dynamique
- **🎨 Interface responsive** : Design moderne avec thème sombre/clair
- **🎠 Carrousel interactif** : Navigation fluide entre les actualités avec auto-play
- **🔍 Recherche avancée** : Filtrage par catégorie et recherche textuelle
- **👤 Profil utilisateur** : Modification complète des informations personnelles
- **📱 Design adaptatif** : Mobile-first avec animations CSS fluides
- **🗑️ Gestion des favoris** : Suppression avec confirmation et feedback visuel

### Backend (Node.js + Express)
- **🛡️ API RESTful sécurisée** : Endpoints protégés pour toutes les opérations
- **📊 Base de données MongoDB** : Structure optimisée avec Mongoose
- **🔑 Authentification JWT** : Tokens sécurisés avec expiration (3 jours)
- **⭐ Gestion des favoris** : CRUD complet pour les articles favoris
- **🌐 Articles multilingues** : API avec filtrage par langue (`lang=fr|en`)
- **🔒 Sécurité renforcée** : CORS, hashage bcrypt, validation des données
- **📝 Logging complet** : Connexions/déconnexions trackées

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- MongoDB (v6+)
- npm ou yarn

### Configuration Backend

1. Naviguez vers le dossier backend :
```bash
cd projet-final-back-Timo91080
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```

4. Modifiez le fichier `.env` avec vos paramètres :
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ArticleFoot_db
JWT_SECRET=superSecretKey123
```

5. Démarrez le serveur backend :
```bash
npm run dev
```

### Configuration Frontend

1. Naviguez vers le dossier frontend :
```bash
cd front-projet-final-Timo91080
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm run dev
```

## 🌍 Internationalisation

### Support complet français/anglais :
- **Changement dynamique** : Basculement instantané sans rechargement
- **Persistance** : Langue sauvegardée dans le localStorage
- **Articles traduits** : Contenu adapté selon la langue sélectionnée
- **Interface complète** : Tous les textes, labels, messages et placeholders
- **Footer multilingue** : Navigation, contact et mentions légales

### Fichiers de traduction :
- `src/i18n/locales/fr.json` - Traductions françaises
- `src/i18n/locales/en.json` - Traductions anglaises
- Configuration i18next avec détection automatique

## 📊 Structure de la Base de Données

### Collections MongoDB :
- **users** : Comptes utilisateurs avec favoris
  - `username` : Nom d'utilisateur unique
  - `email` : Adresse email unique
  - `password` : Mot de passe hashé (bcrypt)
  - `favorites` : Array des liens d'articles favoris
  - `avatar` : URL de l'avatar (généré automatiquement)
  - `createdAt` : Date de création du compte

### Articles mockés :
- **Articles bilingues** : Même contenu en français et anglais
- **Catégories traduites** : "Mercato" → "Transfer Market"
- **Sources réelles** : L'Équipe, RMC Sport, Le Monde, etc.
- **Images optimisées** : URLs d'images football haute qualité

## 🔐 Authentification Avancée

### Système JWT complet :
- **Inscription sécurisée** : Validation email unique, hashage mot de passe
- **Connexion persistante** : Token JWT 3 jours avec refresh
- **Profil dynamique** : Modification username, email, mot de passe
- **Suppression compte** : Confirmation obligatoire, suppression définitive
- **Protection routes** : Middleware d'authentification côté serveur
- **Gestion erreurs** : Messages d'erreur internationalisés

## 🎨 Interface Utilisateur Moderne

### Design System :
- **🎨 Palette cohérente** : Bleu marine (#101549), jaune accent (#FFD600)
- **📝 Typographie** : Bebas Neue (titres), Inter (texte)
- **🌙 Thème adaptatif** : Mode sombre/clair avec transition fluide
- **✨ Animations CSS** : Fade-in, slide-in, hover effects, scale transforms
- **📱 Responsive design** : Mobile-first, breakpoints optimisés

### Composants interactifs :
- **🎠 Carrousel avancé** : Auto-play, navigation manuelle, article central mis en avant
- **🃏 Cards modernes** : Hover effects, images optimisées, catégories colorées
- **🗑️ Favoris avec modal** : Confirmation de suppression, icône poubelle rouge
- **🔍 Recherche live** : Filtrage instantané avec highlight
- **🌐 Sélecteur de langue** : Dropdown élégant avec drapeaux

## 🛡️ Sécurité & Performance

### Sécurité :
- **🔐 JWT sécurisé** : Secret fort, expiration configurée
- **🔒 Hashage bcrypt** : Salt rounds optimisés (10)
- **🛡️ Validation serveur** : Sanitisation des entrées utilisateur
- **🌐 CORS configuré** : Origins autorisées en production
- **🚫 Protection XSS** : Échappement des données utilisateur

### Performance :
- **⚡ Vite build tool** : Compilation ultra-rapide
- **🎯 Code splitting** : Lazy loading des pages
- **📦 Bundle optimisé** : Tree shaking automatique
- **🖼️ Images lazy** : Chargement différé des images
- **💾 Cache localStorage** : Thème, langue, authentification

## 📱 API Endpoints Complète

### 🔐 Authentification
```
POST /api/auth/register      # Inscription utilisateur
POST /api/auth/login         # Connexion avec JWT
POST /api/auth/logout        # Déconnexion (logging)
GET  /api/auth/me            # Profil utilisateur actuel
```

### 👤 Gestion du profil
```
PUT    /api/auth/me          # Modifier username/email
PUT    /api/auth/me/password # Changer le mot de passe
DELETE /api/auth/delete      # Supprimer le compte
```

### ⭐ Système de favoris
```
POST /api/auth/favorites/add     # Ajouter aux favoris
POST /api/auth/favorites/remove  # Retirer des favoris
```

### 📰 Articles multilingues
```
GET /api/auth/articles/mock?lang=fr  # Articles français
GET /api/auth/articles/mock?lang=en  # Articles anglais
GET /api/auth/articles/mock          # Tous les articles
```

## 🔧 Développement

### Scripts disponibles :

**Frontend :**
```bash
npm run dev      # Serveur Vite avec HMR
npm run build    # Build production optimisé
npm run preview  # Aperçu du build
npm run lint     # ESLint + TypeScript check
```

**Backend :**
```bash
npm run dev      # Serveur nodemon (auto-reload)
npm start        # Serveur production
npm run test     # Tests unitaires (à implémenter)
```

### Architecture Frontend :
```
src/
├── components/           # Composants réutilisables
│   ├── ArticleCard.tsx   # Card d'article avec favoris
│   ├── Footer.tsx        # Footer multilingue
│   ├── Navbar.tsx        # Navigation avec thème/langue
│   ├── Loader.tsx        # Composant de chargement
│   └── NotificationContainer.tsx # Système de notifications
├── pages/                # Pages principales
│   ├── Home.tsx          # Accueil avec carrousel
│   ├── Login.tsx         # Connexion avec validation
│   ├── Register.tsx      # Inscription multilingue
│   ├── Profil.tsx        # Gestion profil complet
│   └── Favoris.tsx       # Favoris avec modal suppression
├── contexts/             # Contextes React
│   ├── AuthContext.tsx   # Authentification globale
│   └── ThemeContext.tsx  # Gestion thème sombre/clair
├── hooks/                # Hooks personnalisés
│   ├── useAuth.ts        # Hook authentification
│   ├── useFavorites.ts   # Hook gestion favoris
│   ├── useApi.ts         # Hook requêtes API
│   └── useNotification.ts # Hook notifications
├── i18n/                 # Internationalisation
│   ├── index.ts          # Configuration i18next
│   └── locales/          # Fichiers de traduction
│       ├── fr.json       # Traductions françaises
│       └── en.json       # Traductions anglaises
├── styles/               # Styles globaux
│   ├── animations.css    # Animations CSS
│   ├── themes.css        # Variables CSS thèmes
│   └── index.css         # Styles de base
└── assets/               # Images et ressources
```

### Architecture Backend :
```
├── controllers/          # Logique métier
│   └── authControllers.js # Contrôleurs authentification
├── middleware/           # Middlewares Express
│   └── authMiddleware.js  # Vérification JWT
├── models/               # Modèles MongoDB
│   ├── User.js           # Schéma utilisateur
│   └── mockArticles.js   # Articles mockés multilingues
├── routes/               # Routes API
│   └── authRoutes.js     # Routes authentification
└── server.js             # Serveur Express principal
```

## 📦 Technologies Utilisées

### 🎯 Frontend Stack :
- **⚛️ React 19** + TypeScript (composants typés)
- **⚡ Vite** (build tool ultra-rapide avec HMR)
- **🛣️ React Router v6** (navigation SPA)
- **🌍 React i18next** (internationalisation complète)
- **🎨 React Icons** (bibliothèque d'icônes moderne)
- **✨ CSS3 pur** (animations, grid, flexbox)

### 🔧 Backend Stack :
- **🟢 Node.js** + Express.js (serveur REST)
- **🍃 MongoDB** + Mongoose (base NoSQL)
- **🔐 JWT** (authentification stateless)
- **🔒 Bcrypt** (hashage sécurisé mots de passe)
- **🌐 CORS** (cross-origin configuré)

### 🛠️ Outils de développement :
- **📝 ESLint** + Prettier (qualité du code)
- **🔍 TypeScript** (typage statique strict)
- **🔄 Nodemon** (auto-reload serveur)
- **🌐 i18next DevTools** (debug traductions)

## 🌟 Fonctionnalités Avancées

### 🎠 Carrousel intelligent :
- **⏱️ Auto-play** : Défilement automatique toutes les 3.5s
- **🎮 Contrôles manuels** : Boutons précédent/suivant
- **🎯 Focus central** : Article central agrandi avec effet
- **📱 Touch support** : Swipe mobile natif
- **⏸️ Pause hover** : Arrêt auto-play au survol

### ⭐ Système de favoris professionnel :
- **➕ Ajout instantané** : Un clic avec feedback visuel
- **🗑️ Suppression sécurisée** : Modal de confirmation obligatoire
- **💾 Persistance BDD** : Sauvegarde en base MongoDB
- **🔄 Synchronisation** : Mise à jour temps réel interface
- **📱 Page dédiée** : Gestion complète des favoris

### 🌍 Internationalisation avancée :
- **🔄 Changement dynamique** : Sans rechargement de page
- **💾 Persistance** : Langue sauvegardée utilisateur
- **📰 Contenu adapté** : Articles traduits selon langue
- **🎨 Interface complète** : 100% des textes traduits
- **🌐 Détection auto** : Langue navigateur par défaut

### 🎨 Thème adaptatif premium :
- **🌙 Mode sombre/clair** : Basculement instantané
- **🎨 Variables CSS** : Cohérence couleurs globale
- **💾 Mémorisation** : Choix persistant utilisateur
- **🖼️ Images adaptées** : Contraste optimisé par thème
- **⚡ Transition fluide** : Animation changement thème

## 🚀 Déploiement Production

### 🌐 Recommandations hébergement :
1. **Backend** : Railway/Render + MongoDB Atlas
2. **Frontend** : Vercel/Netlify (déploiement automatique)
3. **CDN** : Cloudflare pour les images
4. **Monitoring** : Sentry pour les erreurs

### ⚙️ Configuration production :
```env
# Backend .env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/foot-journal
JWT_SECRET=ultra-secure-secret-key-256-bits
CORS_ORIGIN=https://foot-journal.vercel.app
```

### 🔒 Sécurité production :
- **HTTPS obligatoire** : Certificats SSL automatiques
- **CORS strict** : Origins autorisées uniquement
- **Rate limiting** : Protection contre spam API
- **Logs centralisés** : Monitoring erreurs temps réel
- **Backups auto** : Sauvegarde MongoDB quotidienne

## 📱 Responsive Design Expert

### 📐 Breakpoints optimisés :
- **📱 Mobile** : 320px-599px (menu hamburger)
- **🔲 Tablette** : 600px-899px (layout hybride)
- **💻 Desktop** : 900px-1199px (layout classique)
- **🖥️ Large** : 1200px+ (layout étendu)

### 🎯 Optimisations mobile :
- **👆 Touch-friendly** : Boutons 44px minimum
- **📊 Grid responsive** : 1-2-3 colonnes selon écran
- **🖼️ Images adaptives** : Tailles optimisées par device
- **⚡ Performance** : Lazy loading images
- **🎨 UI adaptée** : Espacements et polices optimisés

## 🎯 Objectifs Pédagogiques Atteints

### 🎓 Compétences démontrées :
- **⚛️ React/TypeScript avancé** : Hooks, Context, composants typés
- **🏗️ Architecture moderne** : Séparation frontend/backend propre
- **🎨 UX/UI professionnelle** : Design responsive et accessible
- **🔐 Sécurité web** : JWT, validation, protection XSS
- **🌍 Internationalisation** : i18n complète avec React
- **📊 Base de données** : MongoDB avec relations et validation
- **🛠️ Tooling moderne** : Vite, ESLint, TypeScript
- **📱 Mobile-first** : Design adaptatif professionnel

### 💡 Innovations techniques :
- **🎠 Carrousel custom** : Sans librairie externe
- **🗑️ Modal de confirmation** : UX optimisée suppression
- **🌐 Articles multilingues** : API avec filtrage dynamique
- **🎨 Système de thème** : CSS variables + React Context
- **⭐ Favoris temps réel** : Synchronisation instantanée
- **📝 Validation complète** : Frontend + Backend cohérents

## 📈 Métriques Performance

### ⚡ Scores Lighthouse (cible) :
- **🎯 Performance** : 90+ (optimisations Vite)
- **♿ Accessibilité** : 95+ (ARIA, contrastes)
- **✅ Bonnes pratiques** : 100 (HTTPS, sécurité)
- **🔍 SEO** : 90+ (meta tags, structure)

### 📊 Métriques techniques :
- **📦 Bundle size** : < 500KB (tree shaking)
- **⏱️ Time to Interactive** : < 3s
- **🖼️ Images optimisées** : WebP, lazy loading
- **💾 Cache strategy** : Service worker (future)

## 🏆 Fonctionnalités Bonus

### 🔮 Améliorations futures :
- **💬 Système de commentaires** : Avec modération
- **🔔 Notifications push** : Nouveaux articles
- **📊 Dashboard admin** : Gestion contenu
- **🎮 Gamification** : Points, badges lecture
- **📧 Newsletter** : Abonnement articles
- **🔍 Recherche avancée** : Elasticsearch
- **📱 PWA** : Installation mobile
- **🌐 Plus de langues** : Espagnol, Italien

### 🎨 Améliorations UX :
- **🎵 Sons d'interface** : Feedback audio
- **🌈 Plus de thèmes** : Équipes de foot
- **🎯 Personnalisation** : Dashboard utilisateur
- **📱 Gestes mobile** : Swipe actions
- **♿ Accessibilité +** : Navigation clavier
- **🔍 Recherche vocale** : API Speech
- **📊 Statistiques** : Temps lecture, favoris

## 📄 Licence & Crédits

**📚 Projet étudiant** développé dans le cadre d'une formation en développement web full-stack.

### 👨‍💻 Développeur :
- **Nom** : Timo
- **Formation** : Développement Web & Mobile
- **Technologies** : React, Node.js, MongoDB
- **Spécialités** : Frontend moderne, UX/UI, APIs REST


---

**🚀 Développé avec ❤️, ⚽ et beaucoup de ☕ par Timo**

*"Un projet qui démontre la maîtrise complète du développement web moderne, de l'authentification sécurisée aux animations CSS, en passant par l'internationalisation et l'architecture scalable."*