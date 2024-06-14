document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let playingAgainstAI = localStorage.getItem('playingAgainstAI') === 'true';

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

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    function handleCellClick(event) {
        const index = event.target.getAttribute('data-index');
        if (board[index] !== '' || checkWin() || checkDraw()) {
            return;
        }

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            restartGame();
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            restartGame();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (playingAgainstAI && currentPlayer === 'O') {
            aiMove();
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function checkDraw() {
        return board.every(cell => cell !== '');
    }

    function restartGame() {
        board.fill('');
        cells.forEach(cell => (cell.textContent = ''));
        currentPlayer = 'X';
    }

    function aiMove() {
        let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        if (availableCells.length === 0) return;
        let move = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[move] = 'O';
        cells[move].textContent = 'O';

        if (checkWin()) {
            alert('O wins!');
            restartGame();
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            restartGame();
            return;
        }

        currentPlayer = 'X';
    }
});
