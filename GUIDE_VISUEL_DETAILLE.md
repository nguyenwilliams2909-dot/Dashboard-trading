# 📹 GUIDE VISUEL PAS À PAS

## 🎬 ÉTAPE 1 : Préparer votre code (Terminal)

### Sur votre ordinateur :

```bash
# 1. Ouvrir Terminal/PowerShell
# 2. Aller dans le dossier du projet
cd ~/Documents/trading-dashboard
# (ou où vous avez téléchargé les fichiers)

# 3. Initialiser Git
git init

# 4. Ajouter tous les fichiers
git add .

# 5. Créer le premier commit
git commit -m "Initial commit - Trading Dashboard"

# 6. Renommer main (important pour Vercel)
git branch -M main

# Si vous voyez : "hint: Using 'master' as the name..." c'est normal
```

**Vous devriez voir :**
```
[main (root-commit) abc1234] Initial commit
 15 files changed, 500 insertions(+)
```

---

## 🎬 ÉTAPE 2 : Créer repository GitHub

1. **Ouvrir** : https://github.com/new
2. **Remplir** :
   - Repository name : `trading-dashboard`
   - Description : `Trading Dashboard pour FTMO et Lucid Trading`
   - Visibility : **Public** (pour Vercel gratuit)
   - ❌ **NE PAS cocher** : "Initialize with README"

3. **Cliquer** : Green button "Create repository"

4. **Vous verrez une page** avec des commandes. **NE RIEN FAIRE** pour le moment.

---

## 🎬 ÉTAPE 3 : Connecter votre code local à GitHub

**Copier les commandes de GitHub et les exécuter dans Terminal :**

```bash
# Remplacer VOTRE_USERNAME par votre identifiant GitHub
git remote add origin https://github.com/VOTRE_USERNAME/trading-dashboard.git

# Envoyer le code
git branch -M main
git push -u origin main

# Vous devrez entrer votre token GitHub (créer un token si demandé)
```

**Vous devriez voir :**
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Compressing objects: 100% (12/12), done.
Writing objects: 100% (15/15), ...
To https://github.com/USERNAME/trading-dashboard.git
 * [new branch]      main -> main
```

---

## 🎬 ÉTAPE 4 : Vercel détecte le repo

**Sur https://vercel.com/dashboard** (votre page actuelle) :

1. **Cliquer sur le bouton** 📌
   ```
   Production Checklist: 0/5
   
   ☐ Connect Git Repository    ← ICI
   ```

2. **Cliquer** : "Connect Git Repository"

3. **Choisir** : "GitHub"

4. **Autoriser Vercel** à accéder à GitHub (popup)

5. **Sélectionner** : 
   - Repository: `trading-dashboard`
   - Branch: `main`

6. **Cliquer** : "Import"

---

## 🎬 ÉTAPE 5 : Configuration dans Vercel

Une nouvelle page apparaît avec :

```
Project Name: trading-dashboard
Framework Preset: Next.js ✅ (Auto-détecté)
Root Directory: ./
Build Command: npm run build ✅
Output Directory: .next ✅
Install Command: npm install ✅
```

✅ **TOUT DOIT ÊTRE OK**

**Cliquer** : "Deploy" (gros bouton bleu)

---

## 🎬 ÉTAPE 6 : Attendre le build

**Vous verrez :**

```
Building...
 ↳ Cloning repository
 ↳ Installing dependencies
 ↳ Running build command
 ↳ Generating static pages
```

⏳ **Attendre 2-5 minutes** (premier build est plus lent)

**Vous verrez ✅ "Production" en haut** avec une URL :

```
✅ Production
   https://trading-dashboard-abc123.vercel.app
```

**VOILÀ ! C'est en ligne !** 🎉

---

## 🧪 ÉTAPE 7 : Tester le site

1. **Cliquer** sur l'URL ou la copier dans un nouveau tab
2. **Vous devriez voir** votre dashboard
3. **Tester** : Ajouter un compte
4. **Vérifier** : Refresh la page → données persistent ✅

---

## ⚡ VERSION ULTRA-RAPIDE (CLI)

**Si vous préférez une seule commande :**

```bash
# 1. Installer Vercel
npm install -g vercel

# 2. Se connecter
vercel login
# (ouvre votre navigateur)

# 3. Déployer
vercel --prod

# Répondre aux questions :
# "Set up and deploy?" → y
# "In which directory is your code?" → .
# "Want to modify project settings?" → y

# Attendre et c'est fini !
```

**URL dans le terminal :**
```
✅ Production: https://trading-dashboard-xyz.vercel.app
```

---

## 🔧 EN CAS DE PROBLÈME

### **Erreur : "Build failed"**

1. **Vérifier le log** : Vercel → Deployments → [votre déploiement] → Logs
2. **Lire l'erreur** (elle sera en rouge)
3. **Corriger le code** en local
4. **Committer et pousser** :
   ```bash
   git add .
   git commit -m "Fix build error"
   git push
   ```
5. Vercel redéploiera automatiquement ✨

### **Erreur : "Cannot find module"**

```bash
npm install
npm run build
# Si OK localement mais pas sur Vercel :
# Pousser une modification vide
git commit --allow-empty -m "Trigger rebuild"
git push
```

### **Le site affiche une page blanche**

1. **Ouvrir Developer Tools** : F12
2. **Voir la Console** pour les erreurs
3. **Vérifier** : localStorage fonctionne dans votre navigateur

---

## 📝 COMMANDS UTILS APRÈS DÉPLOIEMENT

```bash
# Voir les logs en temps réel
vercel logs --follow

# Redéployer (sans changement de code)
vercel redeploy --prod

# Lister les déploiements
vercel ls

# Voir l'URL de production
vercel domains list
```

---

## ✅ VÉRIFICATIONS FINALES

Quand vous verrez cette page :

```
Overview
├── Production: https://trading-dashboard-xyz.vercel.app ✅
├── Deployments ✅
└── Analytics (bientôt des données)
```

**C'EST BON !** 🚀

---

## 🎯 RÉSUMÉ EN IMAGES MENTALES

**Avant (votre situation) :**
```
Votre code en local → ❌ Pas en ligne
```

**Après étape 3 :**
```
Votre code en local → GitHub → ✅ En ligne sur Vercel
```

**Auto-redéploiement :**
```
Vous modifiez le code
    ↓
git push vers GitHub
    ↓
Vercel détecte le changement
    ↓
Automatic redeploy ✨
    ↓
URL toujours à jour
```

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ **Déploiement terminé ?** → Aller à l'étape suivante

2. **Ajouter un domaine personnalisé** (optionnel)
   - Vercel Dashboard → Domains
   - Ajouter: `tradingdashboard.com` (si vous avez)

3. **Ajouter des features** :
   - Graphiques
   - Intégration API
   - Base de données
   - etc.

---

## 📞 BESOIN D'AIDE ?

**Quel est votre problème ?**

1. Je comprends pas les termes (Git, GitHub, etc.)
2. J'ai une erreur à l'écran
3. Le site déploie mais ne fonctionne pas
4. Je veux ajouter X feature
5. Autre...

**Dites-moi !** 🎯
