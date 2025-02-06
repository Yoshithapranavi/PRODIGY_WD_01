const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    cell.innerText = currentPlayer;
    board[index] = currentPlayer;
    checkWinner();

    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = `Player ${currentPlayer}'s turn`;
    }
};

const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]); // Highlight winning cells
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `🎉 Player ${currentPlayer} wins! 🎉`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusText.innerText = 'Draw!';
        isGameActive = false;
        return;
    }
};

const highlightWinningCells = (winningCells) => {
    winningCells.forEach(index => {
        cells[index].classList.add('win');
    });
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('win'); // Remove winning highlight
    });
    currentPlayer = 'X';
    isGameActive = true;
    statusText.innerText = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

statusText.innerText = `Player ${currentPlayer}'s turn`;
