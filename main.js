let word, hiddenWord, guessesLeft, guessedLetters;

function startGame() {
    // Array de palabras para adivinar
    const words = ['javascript', 'html', 'css', 'python', 'java', 'ruby', 'php', 'swift', 'boca', 'river', 'empanadas', 'futbol'];

    // Seleccionar una palabra aleatoria del array
    word = words[Math.floor(Math.random() * words.length)];

    // Mostrar los guiones bajos para la palabra oculta
    hiddenWord = '_'.repeat(word.length);
    guessesLeft = 10;
    guessedLetters = [];

    // Mostrar la palabra oculta y los intentos restantes
    document.getElementById('word-container').innerText = hiddenWord.split('').join(' ');
    document.getElementById('guesses').innerText = guessesLeft;

    // Mostrar las letras disponibles
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    document.getElementById('letters').innerHTML = '';
    alphabet.split('').forEach(letter => {
        const letterButton = document.createElement('button');
        letterButton.innerText = letter;
        letterButton.addEventListener('click', () => handleGuess(letter));
        document.getElementById('letters').appendChild(letterButton);
    });

    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('message').innerText = '';
}

function handleGuess(letter) {
    if (guessesLeft > 0 && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (word.includes(letter)) {
            // Actualizar la palabra oculta con la letra adivinada
            hiddenWord = word.split('').map((char, index) => (char === letter ? letter : hiddenWord[index])).join('');
            document.getElementById('word-container').innerText = hiddenWord.split('').join(' ');

            // Verificar si el jugador ha ganado
            if (hiddenWord === word) {
                document.getElementById('message').innerText = '¡Felicidades! ¡Has adivinado la palabra!';
                endGame();
            }
        } else {
            // Reducir el número de intentos restantes
            guessesLeft--;
            document.getElementById('guesses').innerText = guessesLeft;

            // Verificar si el jugador ha perdido
            if (guessesLeft === 0) {
                document.getElementById('message').innerText = `¡Oh no! ¡Has perdido! La palabra era "${word}".`;
                endGame();
            }
        }
    }
}

function endGame() {
    // Desactivar botones de letras
    const letterButtons = document.getElementById('letters').getElementsByTagName('button');
    for (let button of letterButtons) {
        button.disabled = true;
    }
    // Mostrar botón de reinicio
    document.getElementById('restart-button').style.display = 'block';
}

document.getElementById('restart-button').addEventListener('click', startGame);

startGame(); // Iniciar juego al cargar la página