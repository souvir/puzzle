### PUZZLE SOLVER

**Résolution d'un puzzle de pièces interconnectées**

#### Objectif :

Vous devez résoudre un puzzle consistant à assembler un ensemble de pièces carrées sur un plateau de taille fixe. Chaque pièce possède quatre bords, chaque bord ayant une couleur et un type (tête ou pied). Les pièces doivent être placées sur le plateau de manière à ce que les bords adjacents des pièces correspondent parfaitement en couleur, mais soient de types opposés (une tête doit correspondre à un pied de la même couleur).

#### Données :

1. **Pièces du puzzle** : Une liste de pièces, chaque pièce étant un carré divisé en quatre bords. Chaque bord est caractérisé par :

   - **Couleur** : une chaîne de caractères (par exemple, "jaune", "vert", "rouge", "bleu").
   - **Type** : "head" (tête) ou "tail" (pied).

2. **Plateau** : Une grille carrée (de taille `N x N`, où `N` est un entier positif) où chaque case peut contenir une pièce du puzzle ou être vide.

#### Attendu :

1. **Placement des pièces** : Les pièces doivent être placées sur le plateau de manière à ce que les bords adjacents de deux pièces partagent la même couleur mais des types opposés (une tête avec un pied).

2. **Rotations des pièces** : Chaque pièce peut être tournée de 0, 90, 180 ou 270 degrés. Il est nécessaire de considérer toutes les rotations possibles pour trouver la bonne correspondance.

3. **Solutions uniques** : Vous devez trouver toutes les solutions uniques possibles, en tenant compte des rotations du plateau entier. Une solution est considérée comme unique si elle ne peut être obtenue par simple rotation d'une autre solution.

4. **Affichage** : Pour chaque solution trouvée, afficher le plateau de manière lisible en indiquant la position et l'orientation de chaque pièce.

#### Contraintes :

1. **Taille du plateau** : Le plateau sera de taille fixe et carrée (N x N), où `N` est un entier compris entre 1 et 5.
2. **Utilisation des pièces** : Chaque pièce doit être utilisée exactement une fois dans la solution.
3. **Optimisation** : Vous devez éviter les duplications de solutions dues aux rotations du plateau ou aux pièces identiques. Il faut retourner toutes les solutions uniques pour un humain.

#### Exigences supplémentaires :

- **Code** : Vous devez écrire le code qui implémente la solution du puzzle. Le code doit être bien structuré, documenté et lisible.
- **Tests** : Vous devez écrire des tests unitaires pour vérifier la validité de votre code. Ces tests doivent couvrir les cas de base, les cas limites, et doivent être suffisamment exhaustifs pour garantir la robustesse de l'algorithme.

#### Évaluation :

Votre solution sera évaluée sur les critères suivants :

- Exactitude : Le nombre correct de solutions uniques est trouvé.
- Performance : L'efficacité de l'algorithme utilisé pour explorer les possibilités.
- Lisibilité : La clarté du code et des solutions affichées.
- Qualité des tests : Les tests unitaires doivent être complets et prouver que le code fonctionne correctement dans toutes les situations possibles.

---

**Note** : Le puzzle représenté dans l'image fournie correspond à une instance de ce problème où l'objectif est de déterminer la ou les solutions valides pour assembler les pièces sur un plateau de taille 3x3.
