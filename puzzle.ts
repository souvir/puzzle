import { Piece, Edge, Board } from "./types";

// faire tourner une pièce x fois
export function rotatePiece(piece: Piece, rotations: number): Piece {
  const size = piece.length;
  const rotated = new Array(size);
  for (let i = 0; i < size; i++) {
    rotated[i] = piece[(i + rotations) % size];
  }
  return rotated as Piece;
}

// vérifier si deux bords correspondent
export function edgesMatch(edge1: Edge, edge2: Edge): boolean {
  return edge1.color === edge2.color && edge1.type !== edge2.type;
}

// vérifier si une pièce peut être placée sur le plateau
export function isValid(
  board: Board,
  row: number,
  col: number,
  piece: Piece
): boolean {
  // Vérifie si la pièce au-dessus existe et si ses bords correspondent
  if (row > 0 && board[row - 1][col] !== null) {
    if (!edgesMatch(board[row - 1][col]![2], piece[0])) {
      return false;
    }
  }
  // Vérifie si la pièce à gauche existe et si ses bords correspondent
  if (col > 0 && board[row][col - 1] !== null) {
    if (!edgesMatch(board[row][col - 1]![1], piece[3])) {
      return false;
    }
  }
  return true;
}

// générer un hash unique pour le plateau
export function hashBoard(board: Board): string {
  return board
    .map((row) =>
      row
        .map((piece) =>
          piece ? piece.map((e) => `${e.color}-${e.type}`).join(",") : "x"
        )
        .join("|")
    )
    .join("_");
}

// recréer un plateau à partir d'un hash
export function unhashBoard(hash: string, size: number): Board {
  return hash.split("_").map((row) =>
    row.split("|").map((pieceHash) =>
      pieceHash === "x"
        ? null
        : (pieceHash.split(",").map((edgeHash) => ({
            color: edgeHash.split("-")[0],
            type: edgeHash.split("-")[1] as "head" | "tail",
          })) as Piece)
    )
  );
}

// faire tourner le plateau entier d'un quart de tour
export function rotateBoard(board: Board): Board {
  const size = board.length;
  const newBoard: Board = Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const piece = board[size - 1 - j][i];
      newBoard[i][j] = piece ? rotatePiece(piece, 1) : null;
    }
  }
  return newBoard;
}

// générer toutes les rotations possibles d'un plateau
export function generateAllRotations(board: Board): Board[] {
  const transformations: Board[] = [];
  let currentBoard = board;

  for (let rotation = 0; rotation < 4; rotation++) {
    transformations.push(currentBoard);
    currentBoard = rotateBoard(currentBoard);
  }
  return transformations;
}

// générer le hash canonique du plateau pour obtenir toujours le même hash quel que soit son orientation initiale
export function canonicalHash(board: Board): string {
  const allTransformations = generateAllRotations(board);
  const allHashes = allTransformations.map(hashBoard);
  return allHashes.sort()[0];
}

// Fonction pour résoudre le puzzle
export function solvePuzzle(pieces: Piece[], size: number): Board[] {
  if (size < 0 || size > 5) {
    throw new Error("We can't solve this puzzle size");
  }

  const uniqueSolutions = new Set<string>();
  const board: Board = Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));
  const usedPieces = new Set<number>();
  const pieceRotations = pieces.map((piece) => [
    piece,
    rotatePiece(piece, 1),
    rotatePiece(piece, 2),
    rotatePiece(piece, 3),
  ]); // Génère toutes les rotations pour chaque pièce en amont

  function backtrack(row: number, col: number) {
    // Si nous avons atteint la fin du plateau, stocker la solution
    if (row === size) {
      const hash = canonicalHash(board);
      uniqueSolutions.add(hash);
      return;
    }

    // Sinon on parcours les pièces pour trouver la prochaine
    for (let i = 0; i < pieces.length; i++) {
      if (!usedPieces.has(i)) {
        for (const rotatedPiece of pieceRotations[i]) {
          // Vérifie si la pièce peut être placée à la position actuelle
          if (isValid(board, row, col, rotatedPiece)) {
            board[row][col] = rotatedPiece; // Place la pièce sur le plateau
            usedPieces.add(i); // Marque la pièce comme utilisée
            const [nextRow, nextCol] = getNextPosition(row, col, size); // Obtient la position suivante
            backtrack(nextRow, nextCol); // Appel récursif pour la prochaine position
            board[row][col] = null; // Enlève la pièce du plateau (backtrack)
            usedPieces.delete(i); // Marque la pièce comme non utilisée
          }
        }
      }
    }
  }

  // Fonction pour obtenir la position suivante sur le plateau
  function getNextPosition(
    row: number,
    col: number,
    size: number
  ): [number, number] {
    return col === size - 1 ? [row + 1, 0] : [row, col + 1];
  }

  backtrack(0, 0); // Démarre le processus de backtracking à partir de la position (0, 0)

  // Convertit les solutions uniques hashé en plateau lisible
  return Array.from(uniqueSolutions).map((hash) => unhashBoard(hash, size));
}

// afficher une solution de façon lisible pour vérifier le contenu
export function printSolution(solution: Board) {
  for (const row of solution) {
    console.log(
      row
        .map((piece) =>
          piece
            ? `(${piece.map((e) => `${e.color}${e.type}`).join(",")})`
            : "Empty"
        )
        .join(" | ")
    );
    console.log("-".repeat(20 * solution.length));
  }
  console.log("\n");
}

// Données d'exemple
const pieces: Piece[] = [
  [
    { type: "head", color: "orange" },
    { type: "head", color: "bleu" },
    { type: "tail", color: "vert" },
    { type: "tail", color: "rose" },
  ],
  [
    { type: "head", color: "vert" },
    { type: "head", color: "bleu" },
    { type: "tail", color: "orange" },
    { type: "tail", color: "bleu" },
  ],
  [
    { type: "head", color: "orange" },
    { type: "head", color: "rose" },
    { type: "tail", color: "vert" },
    { type: "tail", color: "rose" },
  ],
  [
    { type: "head", color: "vert" },
    { type: "head", color: "rose" },
    { type: "tail", color: "orange" },
    { type: "tail", color: "bleu" },
  ],
  [
    { type: "head", color: "vert" },
    { type: "head", color: "bleu" },
    { type: "tail", color: "orange" },
    { type: "tail", color: "rose" },
  ],
  [
    { type: "head", color: "orange" },
    { type: "head", color: "vert" },
    { type: "tail", color: "rose" },
    { type: "tail", color: "bleu" },
  ],
  [
    { type: "head", color: "vert" },
    { type: "head", color: "orange" },
    { type: "tail", color: "bleu" },
    { type: "tail", color: "rose" },
  ],
  [
    { type: "head", color: "rose" },
    { type: "head", color: "orange" },
    { type: "tail", color: "vert" },
    { type: "tail", color: "bleu" },
  ],
  [
    { type: "head", color: "vert" },
    { type: "head", color: "rose" },
    { type: "tail", color: "orange" },
    { type: "tail", color: "bleu" },
  ],
];

console.log("Résolution du puzzle:");
const solutions = solvePuzzle(pieces, 3);
console.log(`Nombre de solutions uniques trouvées : ${solutions.length}`);
if (solutions.length > 0) {
  console.log("Toutes les solutions uniques trouvées :");
  solutions.forEach((solution, index) => {
    console.log(`Solution ${index + 1}:`);
    printSolution(solution);
  });
}
