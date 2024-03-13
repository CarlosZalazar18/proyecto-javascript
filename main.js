document.addEventListener("DOMContentLoaded", function() {
    let word, hiddenWord, guessesLeft, guessedLetters;

    const wordContainer = document.getElementById('word-container');
    const hangmanText = document.getElementById('hangman-text');
    const guessesSpan = document.getElementById('guesses');
    const lettersContainer = document.getElementById('letters');
    const messageDiv = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');

    function startGame() {
        const words = ['javascript', 'html', 'css', 'futbol', 'java', 'boca', 'river', 'empanadas', 'cocina', 'hamburguesas', 'pizzas', 'regalo', 'juego', 'casa', 'pelota', 'tienda', 'planta', 'computadora', 'teclado', 'dinero', 'doctor', 'raton', 'perfume', 'ventilador',  'chocolate', 'fideos', 'argentina', 'vaso', 'auriculares', 'cliente', 'mensaje', 'carta', 'espejo', 'internet', 'celular', 'television'];
        word = words[Math.floor(Math.random() * words.length)];
        hiddenWord = '_'.repeat(word.length);
        guessesLeft = 10;
        guessedLetters = [];

        wordContainer.textContent = hiddenWord.split('').join(' ');
        hangmanText.textContent = getHangmanDrawing(guessesLeft);
        guessesSpan.textContent = guessesLeft;
        lettersContainer.innerHTML = '';

        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        alphabet.split('').forEach(letter => {
            const letterButton = document.createElement('button');
            letterButton.textContent = letter;
            letterButton.addEventListener('click', () => handleGuess(letter));
            lettersContainer.appendChild(letterButton);
        });

        restartButton.style.display = 'none';
        messageDiv.textContent = '';
    }

    function handleGuess(letter) {
        if (guessesLeft > 0 && !guessedLetters.includes(letter)) {
            guessedLetters.push(letter);
            if (word.includes(letter)) {
                hiddenWord = word.split('').map((char, index) => (char === letter ? letter : hiddenWord[index])).join('');
                wordContainer.textContent = hiddenWord.split('').join(' ');
                if (hiddenWord === word) {
                    messageDiv.textContent = '¡Felicidades! ¡Has adivinado la palabra!';
                    endGame();
                }
            } else {
                guessesLeft--;
                guessesSpan.textContent = guessesLeft;
                hangmanText.textContent = getHangmanDrawing(guessesLeft);
                if (guessesLeft === 0) {
                    messageDiv.textContent = `¡Oh no! ¡Has perdido! La palabra era "${word}".`;
                    endGame();
                }
            }
        }
    }

    function endGame() {
        const letterButtons = document.querySelectorAll('#letters button');
        letterButtons.forEach(button => {
            button.disabled = true;
        });
        restartButton.style.display = 'block';
    }

    function getHangmanDrawing(guessesLeft) {
        const hangmanDrawings = [
            `
             _______
            |/      |
            |      
            |     
            |      
            |     
           _|_____
          | | | | |
          |_|_|_|_|`,
            `
             _______
            |/      |
            |      (_)
            |     
            |      
            |     
           _|_____
          | | | | |
          |_|_|_|_|`,
            `
             _______
            |/      |
            |      (_)
            |       |
            |       
            |     
           _|_____
          | | | | |
          |_|_|_|_|`,
            `
             _______
            |/      |
            |      (_)
            |      /|
            |       
            |     
           _|_____
          | | | | |
          |_|_|_|_|`,
            `
             _______
            |/      |
            |      (_)
            |      /|\\
            |       
            |     
           _|_____
          | | | | |
          |_|_|_|_|`,
            `
             _______
            |/      |
            |      (_)
            |      /|\\
            |      /
            |     
           _|_____
          | | | | |
          |_|_|_|_|`,
            `
             _______
            |/      |
            |      (_)
            |      /|\\
            |      / \\
            |     
           _|_____
          | | | | |
          |_|_|_|_|`
        ];

        return hangmanDrawings[hangmanDrawings.length - guessesLeft - 1];
    }

    restartButton.addEventListener('click', startGame);

    startGame();
});

