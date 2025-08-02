const board = document.getElementById("chessboard");
const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

let selected = null;
let squares = [];

const initialBoard = [
  "rnbqkbnr",
  "pppppppp",
  "........",
  "........",
  "........",
  "........",
  "PPPPPPPP",
  "RNBQKBNR"
];

function createBoard() {
  board.innerHTML = "";
  squares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "white" : "black");

      const piece = initialBoard[row][col];
      square.textContent = pieces[piece] || "";
      square.dataset.row = row;
      square.dataset.col = col;

      square.addEventListener("click", handleMove);

      board.appendChild(square);
      squares.push(square);
    }
  }
}

function handleMove(e) {
  const square = e.currentTarget;
  if (selected) {
    selected.classList.remove("selected");

    const fromRow = selected.dataset.row;
    const fromCol = selected.dataset.col;
    const toRow = square.dataset.row;
    const toCol = square.dataset.col;

    const fromIndex = fromRow * 8 + parseInt(fromCol);
    const toIndex = toRow * 8 + parseInt(toCol);

    squares[toIndex].textContent = squares[fromIndex].textContent;
    squares[fromIndex].textContent = "";

    selected = null;
  } else if (square.textContent !== "") {
    selected = square;
    selected.classList.add("selected");
  }
}

createBoard();