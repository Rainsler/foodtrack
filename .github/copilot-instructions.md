# 🧠 FoodTrack – Blueprint de l’application

## 🎯 Objectif principal
Permettre à l’utilisateur de **gérer son alimentation et son budget** simultanément, en suivant :
- Le **coût total** de sa consommation alimentaire.
- Son **apport calorique hebdomadaire**.
- L’évolution de son **poids et de ses besoins métaboliques** (BMR).

L’application vise un **équilibre entre santé et économie**, avec une interface intuitive et un mode **offline-first**.

---

## 🧩 Stack technique envisagée

| Côté | Technologie | Rôle |
|------|--------------|------|
| Frontend mobile & web | **React Native + Expo / React Native Web** | Interface unifiée Android / iOS / Web |
| Backend | **Firebase** (ou **Supabase**) | Authentification, base de données, stockage cloud |
| Base de données locale | **AsyncStorage** ou **Realm** | Cache et fonctionnement hors-ligne |
| Authentification | Google / Discord | Connexion et profil utilisateur |
| Gestion d’état | Zustand ou Redux Toolkit | Synchronisation locale / cloud |
| UI / Graphiques | React Native Paper / Recharts | Interface fluide et rapports visuels |

---

## 🧱 Fonctionnalités MVP

### 1. Authentification & Profil utilisateur
- Connexion / inscription via Google ou Discord.  
- Sauvegarde de :
  - Nom, âge, taille, poids, sexe.
  - Métabolisme de base (BMR) calculé automatiquement.
- Modification du profil possible.

### 2. Tableau de bord
Vue principale affichant :
- Total hebdomadaire : calories + dépenses.  
- Moyenne journalière.  
- Barres de progression (budget / calories).  
- Raccourcis vers repas, historique et poids.

### 3. Gestion des aliments
Chaque carte contient :
- Nom de l’aliment  
- Unité (g, ml, œuf, portion, etc.)  
- Prix par unité  
- Calories par unité  
- Bouton “favori”

Fonctionnalités :
- Ajouter, modifier, supprimer un aliment.  
- Données locales synchronisées avec le cloud.

### 4. Journal hebdomadaire
- Ajout de repas ou d’achats effectués.  
- Calcul automatique du coût total et des calories.  
- Historique des semaines précédentes (vue calendrier ou liste).

### 5. Suivi du poids
- Entrée manuelle (quotidienne ou hebdomadaire).  
- Graphique d’évolution dans le temps.  
- Comparaison avec la moyenne calorique.

### 6. Mode hors-ligne
- Données manipulables sans connexion.  
- Synchronisation automatique au retour réseau.

---

## 🎨 Design & UX
- Interface minimaliste, inspirée de Notion + Fitbit.  
- Palette sobre : beige / vert / gris doux.  
- Cartes à coins arrondis, ombres légères.  
- Navigation par onglets :
  1. **Dashboard**
  2. **Aliments**
  3. **Historique**
  4. **Profil**

---

## 📊 Évolutions futures (v2)
- Scan de **code-barres (OpenFoodFacts)** pour importer les produits.  
- Recettes / repas enregistrés.  
- Objectifs hebdomadaires (budget ou calories).  
- Synchronisation multi-appareils.  
- Notifications intelligentes (rappels, bilans).  
- Mode communautaire (partage de recettes ou astuces).

---

## 🧠 Objectifs techniques du MVP
1. Authentification + gestion du profil.  
2. CRUD complet des aliments.  
3. Stockage local + synchronisation cloud.  
4. Tableau de bord avec calculs automatiques.  
5. Historique hebdomadaire + suivi du poids.

---

## 🚀 Priorités pour le développement
| Priorité | Fonctionnalité | Description |
|-----------|----------------|--------------|
| 🟥 Haute | Authentification | Google/Discord + profil local |
| 🟥 Haute | CRUD des aliments | Ajouter / modifier / supprimer |
| 🟧 Moyenne | Dashboard | Calcul automatique budget/calories |
| 🟧 Moyenne | Historique | Vue semaine / mois |
| 🟩 Basse | Suivi du poids | Graphique d’évolution |
| 🟩 Basse | Design / animations | Amélioration UI/UX finale |

---

## Adjustments for Web Development
- **Frontend**: React with Vite (web adaptation of React Native + Expo)
- **Backend**: Firebase (using web SDK for auth, database, storage)
- **Local Database**: localStorage (web equivalent of AsyncStorage)
- **Authentification**: Firebase Auth with Google (web flow)
- **Gestion d’état**: Zustand (same)
- **UI / Graphiques**: Material-UI (web equivalent of React Native Paper) / Recharts (same)
- **Navigation**: React Router (web routing instead of RN navigation)
- **Offline Mode**: Use service workers and localStorage for caching
- **Build Tool**: Vite (already set up)
- **Deployment**: Vercel or Netlify for web hosting

---

---

