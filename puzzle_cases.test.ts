import { Piece } from "./types";
import { solvePuzzle } from "./puzzle";

describe("example from screenshot", () => {
  test("should solve it", () => {
    const pieces: Piece[] = [
      [
        { type: "head", color: "orange" },
        { type: "head", color: "blue" },
        { type: "tail", color: "green" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "green" },
        { type: "head", color: "blue" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "blue" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "green" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "green" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "blue" },
      ],
      [
        { type: "head", color: "green" },
        { type: "head", color: "blue" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "green" },
        { type: "tail", color: "pink" },
        { type: "tail", color: "blue" },
      ],
      [
        { type: "head", color: "green" },
        { type: "head", color: "orange" },
        { type: "tail", color: "blue" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "pink" },
        { type: "head", color: "orange" },
        { type: "tail", color: "green" },
        { type: "tail", color: "blue" },
      ],
      [
        { type: "head", color: "green" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "blue" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 1);
    expect(solutions.length).toBeGreaterThan(1);
  });
});

describe("solvePuzzle", () => {
  test("should solve a 1x1 puzzle", () => {
    const pieces: Piece[] = [
      [
        { type: "head", color: "red" },
        { type: "head", color: "blue" },
        { type: "tail", color: "green" },
        { type: "tail", color: "yellow" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 1);
    expect(solutions.length).toBe(1);
  });

  test("should solve a puzzle with asymmetric pieces", () => {
    const pieces: Piece[] = [
      [
        { type: "head", color: "blue" },
        { type: "head", color: "green" },
        { type: "tail", color: "red" },
        { type: "head", color: "blue" },
      ],
      [
        { type: "head", color: "red" },
        { type: "head", color: "green" },
        { type: "tail", color: "purple" },
        { type: "head", color: "purple" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "orange" },
        { type: "tail", color: "red" },
        { type: "tail", color: "green" },
      ],
      [
        { type: "head", color: "red" },
        { type: "head", color: "pink" },
        { type: "head", color: "pink" },
        { type: "tail", color: "green" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 2);
    expect(solutions.length).toBe(2);
  });

  test("should solve a simple 2x2 puzzle with a unique solution", () => {
    const pieces: Piece[] = [
      [
        { type: "head", color: "blue" },
        { type: "head", color: "green" },
        { type: "tail", color: "red" },
        { type: "tail", color: "blue" },
      ],
      [
        { type: "head", color: "red" },
        { type: "head", color: "green" },
        { type: "tail", color: "purple" },
        { type: "tail", color: "purple" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "orange" },
        { type: "tail", color: "red" },
        { type: "tail", color: "green" },
      ],
      [
        { type: "head", color: "red" },
        { type: "head", color: "pink" },
        { type: "tail", color: "pink" },
        { type: "tail", color: "green" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 2);
    expect(solutions.length).toBe(2);
  });

  test("should solve puzzle with identical pieces but different orientations", () => {
    const pieces: Piece[] = [
      [
        { type: "tail", color: "orange" },
        { type: "head", color: "green" },
        { type: "tail", color: "red" },
        { type: "head", color: "orange" },
      ],
      [
        { type: "head", color: "purple" },
        { type: "head", color: "purple" },
        { type: "tail", color: "red" },
        { type: "tail", color: "green" },
      ],
      [
        { type: "head", color: "red" },
        { type: "head", color: "green" },
        { type: "tail", color: "blue" },
        { type: "tail", color: "blue" },
      ],
      [
        { type: "head", color: "red" },
        { type: "tail", color: "pink" },
        { type: "head", color: "pink" },
        { type: "tail", color: "green" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 2);
    expect(solutions.length).toBe(2);
  });

  test("should find multiple solutions for a 2x2 puzzle", () => {
    const pieces: Piece[] = [
      [
        { type: "head", color: "blue" },
        { type: "head", color: "green" },
        { type: "tail", color: "red" },
        { type: "tail", color: "yellow" },
      ],

      [
        { type: "head", color: "red" },
        { type: "head", color: "green" },
        { type: "tail", color: "blue" },
        { type: "tail", color: "yellow" },
      ],

      [
        { type: "head", color: "blue" },
        { type: "head", color: "yellow" },
        { type: "tail", color: "red" },
        { type: "tail", color: "green" },
      ],

      [
        { type: "head", color: "red" },
        { type: "head", color: "yellow" },
        { type: "tail", color: "blue" },
        { type: "tail", color: "green" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 2);
    expect(solutions.length).toBe(12);
  });

  test("should solve a 3x3 puzzle", () => {
    const pieces: Piece[] = Array(9).fill([
      { type: "head", color: "red" },
      { type: "head", color: "blue" },
      { type: "tail", color: "red" },
      { type: "tail", color: "blue" },
    ]);
    const solutions = solvePuzzle(pieces, 3);
    expect(solutions.length).toBeGreaterThan(0);
  });

  test("should solve a 5x5 puzzle with all different pieces within a reasonable time", () => {
    const pieces: Piece[] = Array(25)
      .fill(null)
      .map((_, i) => [
        { type: "head", color: `color${i * 4 + 1}` },
        { type: "head", color: `color${i * 4 + 2}` },
        { type: "tail", color: `color${i * 4 + 3}` },
        { type: "tail", color: `color${i * 4 + 4}` },
      ]);
    const startTime = Date.now();
    const solutions = solvePuzzle(pieces, 5);
    const endTime = Date.now();
    expect(solutions.length).toBe(0);
    expect(endTime - startTime).toBeLessThan(60000);
  }, 65000);

  test("should find solutions for a puzzle with same piece", () => {
    const pieces: Piece[] = [
      [
        { type: "head", color: "red" },
        { type: "head", color: "red" },
        { type: "tail", color: "red" },
        { type: "tail", color: "red" },
      ],
      [
        { type: "head", color: "red" },
        { type: "head", color: "red" },
        { type: "tail", color: "red" },
        { type: "tail", color: "red" },
      ],
      [
        { type: "head", color: "red" },
        { type: "head", color: "red" },
        { type: "tail", color: "red" },
        { type: "tail", color: "red" },
      ],
      [
        { type: "head", color: "red" },
        { type: "head", color: "red" },
        { type: "tail", color: "red" },
        { type: "tail", color: "red" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 2);
    expect(solutions.length).toBe(6);
  });

  test("should find a unique solution for a puzzle with same piece 3x3", () => {
    const pieces: Piece[] = [
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "pink" },
        { type: "tail", color: "orange" },
        { type: "tail", color: "pink" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 2);
    expect(solutions.length).toBe(1);
  });

  test("should return a solution for only tail or head", () => {
    const pieces: Piece[] = [
      [
        { type: "head", color: "green" },
        { type: "head", color: "green" },
        { type: "head", color: "green" },
        { type: "head", color: "green" },
      ],
      [
        { type: "tail", color: "yellow" },
        { type: "tail", color: "green" },
        { type: "tail", color: "yellow" },
        { type: "tail", color: "green" },
      ],
      [
        { type: "head", color: "yellow" },
        { type: "head", color: "yellow" },
        { type: "head", color: "yellow" },
        { type: "head", color: "yellow" },
      ],
      [
        { type: "tail", color: "green" },
        { type: "tail", color: "yellow" },
        { type: "tail", color: "green" },
        { type: "tail", color: "yellow" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 2);
    expect(solutions.length).toBe(1);
  });
});

describe("unsolvable puzzle", () => {
  test("should return no solutions when pieces have edges that don't match any other", () => {
    const pieces: Piece[] = [
      [
        { type: "head", color: "blue" },
        { type: "head", color: "green" },
        { type: "tail", color: "red" },
        { type: "head", color: "blue" },
      ],
      [
        { type: "head", color: "red" },
        { type: "head", color: "green" },
        { type: "tail", color: "purple" },
        { type: "head", color: "purple" },
      ],
      [
        { type: "head", color: "orange" },
        { type: "head", color: "orange" },
        { type: "tail", color: "red" },
        { type: "tail", color: "green" },
      ],
      [
        { type: "head", color: "magenta" },
        { type: "head", color: "violet" },
        { type: "tail", color: "turquoise" },
        { type: "tail", color: "indigo" },
      ],
    ];
    const solutions = solvePuzzle(pieces, 2);
    expect(solutions.length).toBe(0);
  });
});

describe("edge cases", () => {
  test("should handle an empty puzzle", () => {
    const pieces: Piece[] = [];
    const solutions = solvePuzzle(pieces, 0);
    expect(solutions.length).toBe(1);
  });

  test("should handle big number", () => {
    const pieces: Piece[] = [];
    expect(() => solvePuzzle(pieces, Infinity)).toThrow(
      "We can't solve this puzzle size"
    );
  });

  test("should handle bad number params", () => {
    const pieces: Piece[] = [];
    expect(() => solvePuzzle(pieces, -1)).toThrow(
      "We can't solve this puzzle size"
    );
  });
});
