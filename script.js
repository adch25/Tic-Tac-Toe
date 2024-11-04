const cells = document.querySelectorAll('[data-cell]');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] || !isGameActive) return;

  cell.textContent = currentPlayer;
  boardState[cellIndex] = currentPlayer;

  if (checkWinner()) {
    winnerDisplay.textContent = currentPlayer;
    isGameActive = false;
  } else if (boardState.every(cell => cell)) {
    winnerDisplay.textContent = 'Draw';
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boardState[index] === currentPlayer;
    });
  });
}

function resetGame() {
  boardState.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  winnerDisplay.textContent = '';
  isGameActive = true;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);
