# Test salles de réunions

Au sein de l'entreprise, il est prévu un grand nombre de salles de réunions (48). Ton objectif
est de coder une brique du système de réservation.

Faire un petit site pour pouvoir rechercher et réserver l’une des salle de réunion, en fonction
des disponibilités, de la capacité et des équipements. Tu n’as pas besoin de réaliser la
gestion de compte (celle-ci étant gérée par notre intranet).

Chaque réservation doit être enregistrée dans un fichier​ `.json`.

Lors d'une seconde recherche, si on cherche pour la même date/heure, la salle de réunion
réservée précédemment n'apparaîtra pas dans la liste des salles disponibles.

## Consignes

- Le back end doit être en NodeJS et utiliser Express
- Le front end doit être en VueJS
- Les réservations / la récupération des salles de réunions doit se faire en AJAX via
des API REST
- Tu as le choix du format pour stocker vos réservations, mais elles doivent se trouver
dans un fichier .json
- Nous serons particulièrement attentif à la facilité d’utilisation et à la sécurité du
système

## Bonus

- Une version hostée de ton app
- Utiliser mongodb pour stocker les réservations
- Pouvoir filtrer les salles de réunions via des filtres (équipements, capacité)
- Animations lors d'une réservation, Un design pas trop moche ;)