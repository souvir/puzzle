import { Piece, Edge, Board } from "./types";
import {
  solvePuzzle,
  rotatePiece,
  edgesMatch,
  isValid,
  hashBoard,
  rotateBoard,
  unhashBoard,
  generateAllRotations,
  canonicalHash,
} from "./puzzle";

describe("Puzzle Solver", () => {
  const testPieces: Piece[] = [
    [
      { type: "head", color: "bleu" },
      { type: "head", color: "vert" },
      { type: "tail", color: "rouge" },
      { type: "tail", color: "jaune" },
    ],

    [
      { type: "head", color: "rouge" },
      { type: "head", color: "vert" },
      { type: "tail", color: "bleu" },
      { type: "tail", color: "jaune" },
    ],

    [
      { type: "head", color: "bleu" },
      { type: "head", color: "jaune" },
      { type: "tail", color: "rouge" },
      { type: "tail", color: "vert" },
    ],

    [
      { type: "head", color: "rouge" },
      { type: "head", color: "jaune" },
      { type: "tail", color: "bleu" },
      { type: "tail", color: "vert" },
    ],
  ];

  test("solvePuzzle should return solutions for a 2x2 puzzle", () => {
    const solutions = solvePuzzle(testPieces, 2);
    expect(solutions.length).toBeGreaterThan(0);
  });

  test("rotatePiece should correctly rotate a piece", () => {
    const piece = testPieces[0];
    const rotated = rotatePiece(piece, 1);
    expect(rotated).toEqual([
      { type: "head", color: "vert" },
      {
        type: "tail",
        color: "rouge",
      },
      {
        type: "tail",
        color: "jaune",
      },
      {
        type: "head",
        color: "bleu",
      },
    ]);
  });

  test("edgesMatch should correctly identify matching edges", () => {
    const edge1: Edge = { type: "head", color: "bleu" };
    const edge2: Edge = { type: "tail", color: "bleu" };
    expect(edgesMatch(edge1, edge2)).toBe(true);
  });

  test("edgesMatch should correctly identify non-matching edges", () => {
    const edge1: Edge = { type: "head", color: "bleu" };
    const edge2: Edge = { type: "head", color: "rouge" };
    expect(edgesMatch(edge1, edge2)).toBe(false);
  });

  test("isValid should return true for a valid piece placement", () => {
    const board: Board = [
      [testPieces[0], null],
      [null, null],
    ];
    expect(isValid(board, 0, 1, testPieces[2])).toBe(true);
  });

  test("isValid should return false for an invalid piece placement", () => {
    const board: Board = [
      [testPieces[0], null],
      [null, null],
    ];
    expect(isValid(board, 0, 1, testPieces[1])).toBe(false);
  });

  test("isValid should return true for a valid vertical piece placement", () => {
    const board: Board = [
      [testPieces[0], null],
      [null, null],
    ];
    expect(isValid(board, 1, 0, testPieces[1])).toBe(true);
  });

  test("hashBoard should create a unique string for a board configuration", () => {
    const board: Board = [
      [testPieces[0], testPieces[1]],
      [testPieces[2], testPieces[3]],
    ];
    const hash = hashBoard(board);
    expect(typeof hash).toBe("string");
    expect(hash.length).toBeGreaterThan(0);
  });

  test("unhashBoard should recreate the original board from a hash", () => {
    const board: Board = [
      [testPieces[0], testPieces[1]],
      [testPieces[2], testPieces[3]],
    ];
    const hash = hashBoard(board);
    const recreatedBoard = unhashBoard(hash, 2);
    expect(recreatedBoard).toEqual(board);
  });

  test("rotateBoard should correctly rotate the entire board", () => {
    const board: Board = [
      [testPieces[0], testPieces[1]],
      [testPieces[2], testPieces[3]],
    ];
    const rotated = rotateBoard(board);
    expect(rotated).toEqual([
      [rotatePiece(testPieces[2], 1), rotatePiece(testPieces[0], 1)],
      [rotatePiece(testPieces[3], 1), rotatePiece(testPieces[1], 1)],
    ]);
  });

  test("generateAllRotations should return all 4 rotations of the board", () => {
    const board: Board = [
      [testPieces[0], testPieces[1]],
      [testPieces[2], testPieces[3]],
    ];
    const allRotations = generateAllRotations(board);
    expect(allRotations.length).toBe(4);
    expect(allRotations[0]).toEqual(board);
    expect(allRotations[1]).toEqual(rotateBoard(board));
    expect(allRotations[2]).toEqual(rotateBoard(rotateBoard(board)));
    expect(allRotations[3]).toEqual(
      rotateBoard(rotateBoard(rotateBoard(board)))
    );
  });

  test("canonicalHash should return the same hash for all rotations of a board", () => {
    const board: Board = [
      [testPieces[0], testPieces[1]],
      [testPieces[2], testPieces[3]],
    ];
    const allRotations = generateAllRotations(board);
    const canonicalHashes = allRotations.map(canonicalHash);
    expect(new Set(canonicalHashes).size).toBe(1);
  });
});
