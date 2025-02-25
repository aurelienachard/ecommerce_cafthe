# CafThé

## TL;DR

Dans le cadre de mes études de développeur web, je dois réaliser un site web e-commerce. Les technologies utilisées sont ReactJS, MySQL, PHP et Node.js.

Pour le moment je suis sur le développement du site web principal et les fonctionnalités principales sont consulter un catalogue, ajouter un produit au panier et utiliser un système de paiement.

## Présentation de l'entreprise

CafThé est une entreprise spécialisée dans la vente de thés et café  haut de gamme, provenant des quatre coins du monde.

CafThé s’engage à offrir à ses clients une sélection de produits uniques, que ce soit des thés en vrac ou du café en grains, avec un accent sur la qualité et la durabilité. L’entreprise souhaite moderniser son activité en proposant une application de gestion pour les vendeurs, dans sa boutique physique, et un site e-commerce destiné aux clients.

## Présentation du projet

Le projet se décompose en deux parties :

- `Site e-commerce` : Il permet aux clients de consulter les produits et passer des commandes en ligne.
- `Dashboard vendeur` : Il sert à la gestion des produits, commandes, clients, ainsi que pour l'enregistrement des ventes en magasin.

## Fonctionnalités (Site e-commerce)

Technologies utilisées pour le développement du site :

- **ReactJS**: Site web
- **MySQL**: Base de données
- **Node.JS**: API

### Catalogue des produits

- [x] **Affichage des produits** : Les clients peuvent consulter les produits, filtrer par catégorie (thé, café, accessoires), et choisir des produits au poids ou en boîte.
- [x] **Détails des produits** : Fiches produit complètes avec prix TTC, descriptions, et options de quantité.

### Panier d'Achat

- [x] **Gestion du panier** : Ajout et retrait de produits avec mise à jour automatique du total TTC.
- [x] **Saisie des quantités et poids** : Les produits vendus au poids pourront être sélectionnés par tranche de grammes.

### Processus de Commande et Paiement

- [x] **Validation de commande** : Récapitulatif des produits et informations de livraison avant validation.
- [x] **Ajouter un paiement** : Simuler un paiement en ligne ou intégrer un service de paiement réel.
- [x] **Paiement magasin** : Le paiement peut être effectué en magasin lors d’un retrait de commande.
- [x] **Mode de livraison** : On peut retirer sa commande en magasin ou a domicile

### Inscription et Connexion des Clients

- [x] **Inscription en ligne ou en magasin** : Les clients peuvent s’inscrire directement en ligne en créant un mot de passe ou être inscrits en magasin sans mot de passe.
- [x] **Première connexion** : Si un client s’inscrit en magasin, il pourra se connecter en ligne et définir un mot de passe pour accéder à son compte
- [x] **Accès sécurisé** : L’authentification au compte client est obligatoire pour passer une commande.

### Gestion du profil Client

- [x] **Modification des informations** : La fiche client, l’adresse de livraison et le mot de passe peuvent être modifiées.
- [x] **Historique des achats** : Le client peut consulter ses dernières commandes.

## Fonctionnalités (Dashboard vendeur)

Technologies utilises pour la developpement du site:

- **Php**: Site web
- **MySQL**: Base de données

### Accès sécurisé

- [ ] **Accès sécurisé avec un compte administrateur** : Tous les droits.
- [ ] **Accès sécurisé avec un vendeur** : Tous les droits, exception faite de celle de pouvoir créer un compte vendeur.

### Gestion du profil utilisateur

- [ ] **Modification de sa fiche et de son mot de passe** : L’administrateur pourra modifier la fiche vendeur.

### Gestion des produits

- [x] **Ajout, modification, et suppression de produits** : Les vendeurs pourront gérer les thés, cafés ou accessoires, qu’ils soient vendus en boîtes ou au poids.
- [ ] **Catégorisation des produits** : Les produits seront organisés par catégorie, avec un taux de TVA appliqué (5,5 % pour les thés/cafés, 20 % pour les accessoires).
- [ ] **Affichage des prix HT et TTC** : Les vendeurs saisissent le prix HT, et le calcul du prix TTC est automatique selon la TVA.
- [ ] **Gestion du stock** : Suivi du stock en magasin et en ligne.

### Gestion des commandes et Ventes en magasin

- [ ] **Enregistrement des ventes en magasin** : Les vendeurs pourront ajouter les produits achetés par un client dans un panier et finaliser une vente directement dans le Dashboard.
- [ ] **Visualisation des commandes** : Les commandes, qu'elles soient en ligne ou en magasin, sont toutes accessibles dans l'interface.
- [ ] **Mise à jour du statut des commandes** : Modification du statut des commandes (en préparation, expédiée, livrée).
- [ ] **Calcul détaillé** : Détail des montants HT, TVA, et TTC.

### Gestion des clients

- [ ] **Inscription des clients** : Enregistrer un client lors d’une vente en magasin sans mot de passe. À sa première connexion sur le site e-commerce, le client pourra définir un mot de passe.
- [ ] **Gestion des clients** : Les vendeurs pourront consulter les informations des clients, leur historique d'achats et avoir accès à des statistiques personnalisées.
- [ ] **Synchronisation avec l’e-commerce** : Les clients inscrits en magasin pourront retrouver leurs informations et commandes en ligne après avoir défini un mot de passe.

### Tableau de bord

- [ ] **Statistiques de ventes** : Suivi des ventes par produit, catégorie, ou période.
- [ ] **Alerte** : stock bas.
