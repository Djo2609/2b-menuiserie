# Site vitrine — 2B Menuiserie (Benoît Bertrand, Guitinières 17500)

Site statique en HTML/CSS, sans framework ni base de données. 16 pages, prêt à mettre en ligne sur n'importe quel hébergeur.

---

## 1. Structure du dossier

```
/
├── index.html                          Accueil
├── services.html                       Vue d'ensemble des 9 prestations
├── service-cuisine-sur-mesure.html     ★ prestation phare (fiche client)
├── service-terrasse-bois.html          ★ prestation phare (fiche client)
├── service-placo-isolation.html        ★ prestation phare (fiche client)
├── service-dressing-placard.html       (repris du site Wix)
├── service-parquet-flottant.html       (repris du site Wix)
├── service-fabrication-meubles.html    (repris du site Wix)
├── service-pose-velux.html             (repris du site Wix)
├── service-portail-cloture.html        (repris du site Wix)
├── service-portes-fenetres.html        (déduit du véhicule + photos : À VALIDER)
├── realisations.html                   Galerie filtrable (32 photos de chantiers réels)
├── a-propos.html                       Histoire de Benoît Bertrand
├── avis.html                           Avis clients
├── contact.html                        Coordonnées, formulaire de devis, carte, zone
├── mentions-legales.html
├── sitemap.xml · robots.txt · llms.txt
└── assets/
    ├── css/style.css                   UNE seule feuille de styles (tokens en tête de fichier)
    ├── js/main.js                      Menu mobile, filtres galerie, validation du formulaire (defer)
    └── img/                            Photos .webp (2 tailles : -480 et -960), favicon, image de partage
```

> Le fichier `llms.txt` est le nom standard attendu par les moteurs IA (la fiche parlait de « llm.txt »).

---

## 2. Mise en ligne (pas à pas)

### Option A — Hébergeur classique (OVH, o2switch, Ionos, Hostinger…)
1. Acheter / rattacher le nom de domaine (hypothèse retenue : **`2b-menuiserie.fr`**).
2. Ouvrir le gestionnaire FTP de l'hébergeur (ou FileZilla).
3. Envoyer **tout le contenu de ce dossier** dans le répertoire `www/` (ou `public_html/`) — `index.html` doit être à la racine.
4. Activer le certificat SSL gratuit (Let's Encrypt) dans le panneau de l'hébergeur.
5. Tester `https://www.2b-menuiserie.fr` sur ordinateur et téléphone.

### Option B — Netlify (gratuit, le plus rapide)
1. Créer un compte sur netlify.com → **Add new site → Deploy manually**.
2. Glisser-déposer ce dossier entier dans la fenêtre.
3. **Domain settings** → ajouter le domaine du client et suivre les instructions DNS.
4. Le formulaire peut alors utiliser Netlify Forms (voir §3).

### Si le domaine final n'est PAS `www.2b-menuiserie.fr`
Rechercher-remplacer `https://www.2b-menuiserie.fr` par la vraie adresse dans **tous les fichiers** (`*.html`, `sitemap.xml`, `robots.txt`, `llms.txt`). C'est ce qui alimente les balises `canonical`, Open Graph et les données structurées.

---

## 3. Brancher le formulaire de devis (obligatoire)

Le formulaire de `contact.html` est prêt mais **pas encore relié**. Tant que ce n'est pas fait, il affiche le téléphone et l'e-mail au lieu d'envoyer.

- **Formspree** (le plus simple) : créer un formulaire sur formspree.io avec l'e-mail `benoit.bertrand75@gmail.com`, puis remplacer dans `contact.html` :
  `action="https://formspree.io/f/VOTRE_ID"` → par l'URL fournie.
- **Netlify Forms** : remplacer l'attribut `action` par `action="/merci.html"` et ajouter `data-netlify="true"` sur la balise `<form>` (créer une page `merci.html`).

---

## 4. Après la mise en ligne (SEO local)

1. **Google Search Console** : ajouter le domaine, puis soumettre `https://www.2b-menuiserie.fr/sitemap.xml`.
2. **Google Business Profile** : vérifier que la fiche porte exactement le même nom, adresse et téléphone que le site (NAP identique), et y mettre le lien du site.
3. Copier le lien « Demander un avis » de la fiche Google dans `avis.html` (bouton marqué `data-todo="lien-avis-google"`).
4. Mettre l'adresse du nouveau site sur Facebook, Instagram et sur le véhicule/devis.
5. Rediriger l'ancien site Wix vers le nouveau domaine (ou le dépublier) pour éviter le contenu dupliqué.
6. Contrôler avec PageSpeed Insights (objectif ≥ 90 sur mobile).

---

## 5. Système de design (pour le webdesigner)

**Direction : sobre et professionnelle.** Les couleurs viennent du logo (anthracite + bois noyer) ; le jaune est réservé aux boutons d'action principaux (devis, appel). Pas d'effet décoratif : la mise en valeur repose sur les photos de chantiers, la typographie et des espacements généreux.

| Token | Hex | Usage |
|---|---|---|
| `--sciure` | `#F5F4F0` | Fond général |
| `--blanc` | `#FFFFFF` | Surfaces, cartes |
| `--encre` | `#23241F` | Texte principal, éléments actifs |
| `--graphite` | `#5B5C55` | Texte secondaire |
| `--anthracite` | `#3C3D38` | Couleur du logo — sections sombres |
| `--noyer` | `#8A5A3B` | Bois du logo — liens, intitulés de section, numéros |
| `--metre` | `#F2C230` | Boutons d'action principaux uniquement |

- **Typographies** (Google Fonts) : *Bricolage Grotesque* pour les titres, *Instrument Sans* pour le texte.
- Accessibilité : contrastes AA, focus clavier visible, lien d'évitement, `prefers-reduced-motion` respecté, cibles tactiles ≥ 44 px, barre d'appel fixe sur mobile.

### Modifier un texte
Ouvrir le fichier `.html` concerné dans un éditeur (VS Code, Notepad++), chercher la phrase, la modifier, enregistrer, renvoyer le fichier sur l'hébergeur. **Attention** : l'en-tête et le pied de page sont identiques dans les 16 fichiers ; une modification (ex. horaires, téléphone) doit être faite partout (rechercher-remplacer sur le dossier).

### Ajouter une photo
Convertir en `.webp` (squoosh.app), largeur 960 px + une version 480 px, nommer en minuscules sans accents (`terrasse-pons-2026-960.webp`), placer dans `assets/img/`, puis copier un bloc `<figure class="project">` existant dans `realisations.html`.

---

## 6. À FOURNIR / À VALIDER avant mise en ligne

### Informations à confirmer par le client
| # | Élément | Où | État actuel |
|---|---|---|---|
| 1 | **Nom de domaine** | tous les fichiers | Hypothèse `www.2b-menuiserie.fr` |
| 2 | **Horaires d'ouverture** | contact, pied de JSON-LD | Hypothèse : lun-ven 8h-12h / 13h30-18h, samedi sur RDV |
| 3 | **Prestation « Portes & fenêtres »** (bois/alu/PVC, baies, portes de garage) | `service-portes-fenetres.html` | Déduite du flocage du véhicule et des photos — absente du site Wix. Supprimer la page si non pratiqué |
| 4 | Statut **« Installateur Conseil Velux »** | `service-pose-velux.html` | Repris du site Wix — vérifier que l'adhésion au programme est à jour |
| 5 | Essences de bois proposées pour les terrasses (pin autoclave, exotiques, composite ?) | `service-terrasse-bois.html` | Formulation prudente |
| 6 | Pose de cuisines fournies par le client : oui / non ? | FAQ cuisine | Réponse « oui » supposée |
| 7 | Voix du site : le site parle à la 1ʳᵉ personne (« je ») comme l'ancien site. Benoît travaille-t-il seul ? | partout | « je » retenu |
| 8 | Coordonnées GPS exactes de l'atelier | JSON-LD, carte | Centre de la commune (45.4422, -0.5092) — à remplacer par la position exacte (clic droit sur Google Maps) |

### Mentions légales (obligatoires — à compléter)
- Forme juridique, immatriculation (RNE / Répertoire des métiers), n° TVA ou mention « TVA non applicable, art. 293 B du CGI »
- **Assurance décennale / RC Pro** : nom de l'assureur et zone couverte (obligatoire pour un artisan du bâtiment)
- Hébergeur : nom, adresse, téléphone

### Visuels
- ✅ **Toutes les photos du site sont des chantiers réels du client**, récupérées sur son site Wix (≈ 55 retenues sur 93). Aucune photo de banque d'images n'est utilisée.
- ✅ Logo original conservé : `assets/img/logo-2b-menuiserie-original.webp`. Le site utilise une version vectorielle redessinée (carré bois « 2B ») dans l'en-tête et le favicon.
- ⬜ **Logo vectoriel officiel (SVG/AI/PDF)** si le client en possède un — le logo actuel est un PNG 500 px avec le téléphone intégré, inadapté au web.
- ⬜ **Portrait de Benoît Bertrand** (visage, à l'atelier) pour la page À propos — très efficace en confiance locale.
- ⬜ **Photos de l'atelier** (établi, machines, bois en stock).
- ⬜ Photos en meilleure définition pour : portails (2 seulement), parquet (avant/après en 1200 px), fenêtres de toit.
- ⬜ Photos Instagram / Facebook : non récupérables automatiquement (connexion requise). Demander au client un export des meilleures photos récentes.

### Avis clients
- ✅ 1 avis réel repris du site Wix (M. et Mme Chaigneau).
- ⬜ 2 emplacements prévus dans `avis.html` (encadrés pointillés) : coller de **vrais** avis Google (texte, prénom, date). Ne jamais inventer d'avis.
- ⬜ Lien « Laisser un avis Google » à insérer (voir §4).

### Divers
- ⬜ Brancher le formulaire (voir §3).
- ⬜ Le texte du site Wix mentionnait « Qualité 100 % garantie » : formulation conservée de façon plus sobre (« Qualité garantie »). À valider.
