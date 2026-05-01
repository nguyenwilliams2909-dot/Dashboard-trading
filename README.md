# 🚀 Trading Dashboard - FTMO & Lucid Trading

Dashboard professionnel pour gérer vos comptes FTMO Trading (CFD) et Lucid Trading (Futures).

## ✨ Fonctionnalités

- ✅ **Gestion complète des comptes** - Ajouter, éditer, supprimer vos comptes
- 📊 **Résumé global** - Vue d'ensemble consolidée de tous les comptes
- 💾 **Stockage local sécurisé** - Les données sont sauvegardées localement
- 🎨 **Interface moderne** - Design sombre professionnel et responsif
- 📱 **Mobile-friendly** - Optimisé pour tous les appareils
- ⚡ **Performance** - Chargement rapide avec Next.js
- 🔒 **Clés API sécurisées** - Stockage local et masquage des clés

## 📊 Métriques Suivi

- **Balance** - Solde actuel du compte
- **Équité** - Valeur nette du portefeuille
- **Drawdown** - Perte maximale
- **P&L** - Gain/Perte du jour
- **Win Rate** - Pourcentage de trades gagnants
- **Total Trades** - Nombre total de transactions

## 🛠️ Installation Locale

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes

1. **Cloner le repository**
```bash
git clone <votre-repo>
cd trading-dashboard
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer en développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 🚀 Déploiement sur Vercel

### Méthode 1 : Déploiement simple

1. **Créer un compte Vercel** : https://vercel.com
2. **Connecter votre repository GitHub**
3. **Vercel détectera automatiquement** que c'est un projet Next.js
4. **Cliquer sur "Deploy"**

### Méthode 2 : Avec Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

### Méthode 3 : Drag & Drop

1. Accédez à https://vercel.com/dashboard
2. Allez dans "New Project"
3. Déposez le dossier du projet
4. Vercel s'occupe du reste !

## 📁 Structure du Projet

```
trading-dashboard/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Dashboard principal
│   └── globals.css         # Styles globaux
├── public/
│   └── favicon.ico         # Favicon
├── package.json            # Dépendances
├── tailwind.config.js      # Configuration Tailwind
├── postcss.config.js       # Configuration PostCSS
├── next.config.js          # Configuration Next.js
└── tsconfig.json           # Configuration TypeScript
```

## 🎨 Personnalisation

### Changer les couleurs
Modifiez `tailwind.config.js` :
```js
colors: {
  primary: {
    500: '#0ea5e9',  // Votre couleur
  }
}
```

### Ajouter des pages
Créez des fichiers `.tsx` dans le dossier `app/` :
```bash
app/
├── page.tsx          # / (accueil)
├── analytics/
│   └── page.tsx      # /analytics
└── settings/
    └── page.tsx      # /settings
```

## 🔧 Variables d'Environnement

Créez un fichier `.env.local` :
```
NEXT_PUBLIC_API_URL=https://api.exemple.com
```

## 📱 Support Mobile

Le dashboard est entièrement responsive et fonctionne sur :
- 📱 iPhone, Android
- 💻 Tablettes
- 🖥️ Desktops

## 🔒 Sécurité

- Les données sont stockées **localement** dans le navigateur
- Les clés API sont **masquées** et non transmises
- **Aucune donnée envoyée** à des serveurs externes
- **Chiffrement local** lors du stockage

## 🐛 Dépannage

### Problème : Données perdues après fermeture
**Solution :** Les données sont dans localStorage. Vérifiez les paramètres de confidentialité du navigateur.

### Problème : Erreur "Cannot find module"
**Solution :**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problème : Port 3000 déjà utilisé
**Solution :**
```bash
npm run dev -- -p 3001
```

## 📈 Futures Améliorations

- [ ] Graphiques en temps réel
- [ ] Intégration API FTMO/Lucid
- [ ] Historique des trades
- [ ] Alertes et notifications
- [ ] Export CSV/PDF
- [ ] Authentification utilisateur
- [ ] Sauvegarde cloud
- [ ] Mode sombre/clair

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous license MIT. Voir le fichier `LICENSE` pour plus de détails.

## 💬 Support

Pour toute question ou problème :
- 📧 Email : support@exemple.com
- 💬 Discord : https://discord.gg/exemple
- 🐛 GitHub Issues : https://github.com/exemple/issues

## 🙏 Remerciements

- Next.js pour le framework
- Tailwind CSS pour les styles
- Lucide React pour les icônes
- Vercel pour l'hébergement

---

**Happy Trading! 🚀📈**

Made with ❤️ for traders
