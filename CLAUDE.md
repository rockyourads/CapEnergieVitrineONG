# CLAUDE.md - Site Vitrine Cap Énergie ONG

## Contexte du projet

Site vitrine présentant les réalisations photovoltaïques de **Cap Énergie** pour des ONG et organisations humanitaires.
Inspiré de http://www.capenergie.fr/catalogue/ mais recentré uniquement sur le volet ONG/humanitaire.

## Objectif

Créer un site vitrine (pas e-commerce, pas catalogue produit) qui :
- Présente les installations photovoltaïques réalisées par Cap Énergie pour des ONG
- Organise les projets par **pays** et/ou par **client ONG**
- Affiche des **galeries photos** des installations
- Propose un **formulaire de demande de devis**
- Présente les **fondateurs** de Cap Énergie (pas les salariés)

## Informations Cap Énergie

### Entreprise
- **Nom** : Cap Énergie (CAPENERGIE)
- **Fondée** : 2007
- **Siège** : Montpellier, France
- **Téléphone** : +33(0)4 67 56 77 91
- **Activité** : Distributeur photovoltaïque et concepteur de solutions off-grid
- **Expertise** : +25 ans d'expérience à l'export, spécialisation Afrique et Asie
- **YouTube** : https://www.youtube.com/@capenergieongirdoffgridsol9695

### Fondateurs / Direction (à présenter sur le site)
- **Céline Loubet** — Directrice Générale, Responsable Achats & Distribution
- **Sébastien Weibel** — Directeur Général, Responsable Export
- **Jean-Marc Darboux** — Lead Stratégie

> **Note** : Ne PAS inclure les autres membres de l'équipe (Florent Manent, Stéphane Gauci, Elodie Marsal) — uniquement les fondateurs/direction.
> À confirmer avec le client quels profils sont réellement "fondateurs" vs "salariés dirigeants".

### Valeurs affichées
- Construire sur la confiance
- Une équipe pleinement investie
- Agir avec sens

## Projets ONG / Références connues

### Projets identifiés sur le site actuel
| Projet | Pays | Client/Type | Catégorie |
|--------|------|-------------|-----------|
| Croix Rouge, Cebu | Philippines | Croix Rouge (ONG) | Site Isolé / Off Grid |
| Village de Sammueluang | Laos | ONG | Site Isolé / Off Grid |
| 7 centres médicaux | Dominique | ONG | Site Isolé / Off Grid |
| Banque Société Générale | Burkina Faso | Institutionnel | Autoconsommation |
| Aéroport Amdjarass | Tchad | Aéroportuaire | Site Isolé |

### ONG partenaires mentionnées
- **Électriciens sans Frontières** (à confirmer)
- **Croix Rouge**
- Autres ONG à identifier avec le client

### Pays d'intervention connus
- Philippines, Laos, Dominique, Burkina Faso, Tchad, Niger, Guyane
- Zones : Afrique, Asie, DOM-TOM, Caraïbes

## Structure du site envisagée

```
/                       → Page d'accueil (hero, mission ONG, CTA devis)
/projets/               → Galerie de tous les projets (filtrable par pays/ONG)
/projets/[pays]/        → Projets par pays
/projets/[ong]/         → Projets par client ONG
/a-propos/              → Présentation fondateurs + histoire Cap Énergie
/devis/                 → Formulaire de demande de devis
```

## Stack technique

À définir. Options possibles :
- **HTML/CSS/JS statique** (simple, rapide)
- **Astro** (site statique moderne, bon pour les galeries photos)
- **Next.js** (si besoin d'un formulaire backend)
- **Hugo / 11ty** (générateurs statiques)

## Formulaire de devis

Champs envisagés :
- Nom de l'organisation / ONG
- Nom du contact
- Email
- Téléphone
- Pays du projet
- Description du besoin (type d'installation, puissance estimée)
- Message libre

Options d'envoi : EmailJS, Formspree, Netlify Forms, ou backend custom.

## Assets à récupérer

- [ ] Logo Cap Énergie
- [ ] Photos des installations ONG (à fournir par le client)
- [ ] Photos des fondateurs
- [ ] Textes de présentation validés par le client
- [ ] Charte graphique (couleurs identifiées : `#3f8685` vert/teal, `#0d1821` bleu foncé)

## Couleurs identifiées sur le site actuel
- **Primaire** : `#3f8685` (vert teal)
- **Fond sombre** : `#0d1821` (bleu très foncé)
- **Accent liens** : couleur "neve-link-color" (à identifier précisément)

## TODO
- [ ] Confirmer avec le client la liste exacte des fondateurs
- [ ] Obtenir les photos des projets ONG
- [ ] Choisir la stack technique
- [ ] Définir l'hébergement (Netlify, Vercel, OVH...)
- [ ] Créer le design / maquette
- [ ] Développer le site
- [ ] Configurer le formulaire de devis
- [ ] Mettre en production
