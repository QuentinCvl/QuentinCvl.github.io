# phpBlog
P5 - OpenClassrooms - Créez votre premier blog en PHP

####Etapes du projet : 

- Trouver et implémenter le template choisi
- Retirer les fichiers inutiles
- Préparer un template d'affichage principale
- Implémenter le MVC et le routeur
- Créer la vue affichant la liste des articles
- Créer la vue affichant le detail d'un article et ses commentaires
- 

## Installer le projet

#### Introduction :
Afin d'installer le projet sur votre machine, commencez par télécharger le code 
(manuellement ou via le git clone)

Une fois téléchargé sur votre machine, ouvrez votre invite de commande, 
placez vous à la racine du dossier contenant le projet et faire les commandes suivantes

#### Commande : 

`$ composer update`

Puis

`$ npm install`

Afin de télécharger tous les paquets nécéssaires au bon fonctionnement du projet

#### Base de donnée : 

Dans le dossier nommer sql, vous trouverez le fichier sql 
nommer phpBlog.sql servant a importer la base de donnée ainsi que 
le fichier data.sql comportant un jeu données afin de pouvoir essayer 
immédiatement le site

Les shéma comprennent donc :
- La création des tables avec leurs attributs, les clés primaires et
les clés étrangères
- Un jeu de données afin de tester directement le site

Pour importer la base de donnée, connecter vous à votre panel de gestion
de base de donnée (phpMyAdmin par exemple ) puis importer le 
fichier sql phpBlog.sql
