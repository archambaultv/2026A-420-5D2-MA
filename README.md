# Applications web 2 - Techniques de l'informatique - Collège de Maisonneuve

Ce dépôt contient le matériel pédagogique du cours Applications web 2
(420-5D2-MA) donné au [Collège de Maisonneuve](https://www.cmaisonneuve.qc.ca/)
par le professeur Vincent Archambault-Bouffard à l'automne 2026.

## Sites web du cours

Le cours est donné à deux groupes, et **chaque groupe a son propre site** :

- [Groupe 1](https://archambaultv.github.io/2026A-420-5D2-MA/g1/)
- [Groupe 2](https://archambaultv.github.io/2026A-420-5D2-MA/g2/)

Il n'y a pas de page d'accueil à la racine `/2026A-420-5D2-MA/`, seulement une
page 404 (`racine/404.html`).

## Développement

```bash
npm install
npm run start:g1     # serveur de développement, site du groupe 1
npm run start:g2     # serveur de développement, site du groupe 2
npm run build        # les deux sites dans build/g1 et build/g2, plus la page 404
```
