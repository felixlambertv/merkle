function questionOne(length: number): number[][] {
  let matrix: number[][] = [];
  for (let i = 0; i < length; i++) {
    matrix[i] = [];
    for (let j = 0; j < length; j++) {
      matrix[i][j] = (i + 1) * (j + 1);
    }
  }
  return matrix;
}

describe("Question 1", () => {
  it("Should return correct data", () => {
    const expectedMatrix = [
      [1, 2, 3, 4, 5],
      [2, 4, 6, 8, 10],
      [3, 6, 9, 12, 15],
      [4, 8, 12, 16, 20],
      [5, 10, 15, 20, 25],
    ];

    expect(questionOne(5)).toEqual(expectedMatrix);
  });
});
