# GSPE

GSPE (ou Gestion des Services Prévisionnels des enseignants) est une application web permettant d'organiser la charge de travail prévu des enseignants par année.


## Pré-requis

* [Node.js](https://nodejs.org/en/download/package-manager)
* [MongoDB](https://www.mongodb.com/products/self-managed/community-edition)

## Installation

Clonez le dossier.

Dans un terminal à la racine du dossier, installez les dépendances :

```bash
npm install
```

Créez une base de données sur MongoDB, le choix du nom vous est libre.

Dupliquez le fichier `.env.example` et renommez le en `.env`.

Renseignez dans les champs :

* `MONGODB_URI` : L'adresse de la base de données nouvellement créé (e.g. "mongodb://localhost:27017/GSPE")
* `AUTH_ORIGIN`: L'adresse du site (e.g. "http://localhost:3000")
* `AUTH_SECRET`: Un mot de passe quelconque, en local cela n'est pas important.

Enfin lancer le site internet :

```bash
npm run dev
```