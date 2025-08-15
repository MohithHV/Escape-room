document.getElementById('start-game').addEventListener('click', () => {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('story-screen').classList.remove('hidden');
});

document.getElementById('start-puzzle-1').addEventListener('click', () => {
    document.getElementById('story-screen').classList.add('hidden');
    document.getElementById('puzzle-1-screen').classList.remove('hidden');
});

const correctAnswers = [
    ['H', 'E', 'A', 'R', 'T'],
    ['L', 'U', 'N', 'G', 'S'],
    ['B', 'R', 'A', 'I', 'N'],
    ['L', 'I', 'V', 'E', 'R'],
    ['K', 'I', 'D', 'N', 'E', 'Y'],
    ['S', 'T', 'O', 'M', 'A', 'C', 'H']
];

document.addEventListener('DOMContentLoaded', () => {
    const checkAnswersBtn = document.getElementById('check-answers');
    const crosswordRows = document.querySelectorAll('.crossword-row');
    const messageElement = document.getElementById('message');

    checkAnswersBtn.addEventListener('click', () => {
        let allCorrect = true;

        crosswordRows.forEach((row, index) => {
            const letterBoxes = row.querySelectorAll('.letter-box');
            let userAnswer = '';
            letterBoxes.forEach(box => {
                userAnswer += box.value.toUpperCase();
            });

            const correctAnswer = correctAnswers[index].join('');

            if (userAnswer === correctAnswer) {
                letterBoxes.forEach(box => {
                    box.classList.remove('incorrect-answer');
                    box.classList.add('correct-answer');
                });
            } else {
                letterBoxes.forEach(box => {
                    box.classList.remove('correct-answer');
                    box.classList.add('incorrect-answer');
                });
                allCorrect = false;
            }
        });

        if (allCorrect) {
            messageElement.textContent = 'All answers are correct! Well done.';
            messageElement.style.color = 'green';

            // Show the word input container
            const wordInputContainer = document.querySelector('.word-input-container');
            if (wordInputContainer) {
                wordInputContainer.classList.remove('hidden');
            }

            

            // Highlight specific letters for the next puzzle
            const highlightMap = [
                0, // H from HEART (1st letter)
                0, // L from LUNGS (1st letter)
                1, // R from BRAIN (2nd letter)
                3, // E from LIVER (4th letter)
                4, // E from KIDNEY (5th letter)
                4  // A from STOMACH (5th letter)
            ];

            crosswordRows.forEach((row, index) => {
                const letterBoxes = row.querySelectorAll('.letter-box');
                const targetIndex = highlightMap[index];
                if (letterBoxes[targetIndex]) {
                    letterBoxes[targetIndex].classList.add('final-highlight');
                }
            });

        } else {
            messageElement.textContent = 'Some answers are incorrect. Please review and try again.';
            messageElement.style.color = 'red';
        }
    });

    // Code to Heart Puzzles Logic
    const puzzleAnswers = {
        'puzzle1': ['VITAMIN A', 'A'], // Puzzle 3 in HTML
        'puzzle2': ['CARBON'],         // Puzzle 1 in HTML
        'puzzle3': ['GLUCOSE']         // Puzzle 2 in HTML
    };

    document.querySelectorAll('.puzzle-section button').forEach(button => {
        button.addEventListener('click', (event) => {
            const puzzleId = `puzzle${event.target.dataset.puzzle}`;
            const inputElement = document.getElementById(`${puzzleId}Input`);
            const feedbackElement = document.getElementById(`feedback${event.target.dataset.puzzle}`);
            const userAnswer = inputElement.value.toUpperCase().trim();
            const correctAnswers = puzzleAnswers[puzzleId];

            // Clear previous feedback classes
            inputElement.classList.remove('correct-answer', 'incorrect-answer');

            if (correctAnswers.includes(userAnswer)) {
                inputElement.classList.add('correct-answer');
                feedbackElement.textContent = 'Correct!';
                feedbackElement.style.color = 'green';
            } else {
                inputElement.classList.add('incorrect-answer');
                feedbackElement.textContent = 'Incorrect. Try again.';
                feedbackElement.style.color = 'red';
            }
        });
    });

    // Example: Highlight some cells (replace with your actual highlighting logic)
    // For demonstration, let's assume cells at specific indices are highlighted
    const highlightedIndices = [0, 1, 2, 3, 4, 5]; // Example indices
    highlightedIndices.forEach(index => {
        const cells = document.querySelectorAll('.cell'); // Assuming .cell is used for individual cells
        if (cells[index]) {
            cells[index].classList.add('highlighted');
        }
    });

    const wordInput = document.getElementById('wordInput');
    const submitWordBtn = document.getElementById('submitWord');
    const feedbackMessage = document.getElementById('feedbackMessage');

    submitWordBtn.addEventListener('click', () => {
        const enteredWord = wordInput.value.toLowerCase();
        const correctWord = 'healer';

        if (enteredWord === correctWord) {
            feedbackMessage.textContent = 'Correct! You found the key. Proceed to the next puzzle.';
            feedbackMessage.style.color = 'green';
            // Show the Next Puzzle button
            const nextPuzzleBtn = document.getElementById('next-puzzle-btn');
            if (nextPuzzleBtn) {
                nextPuzzleBtn.classList.remove('hidden');
            }
            // Here you would add logic to unlock the next puzzle or navigate
            // For example: window.location.href = 'next_puzzle.html';
        } else {
            feedbackMessage.textContent = 'Incorrect word. Please try again.';
            feedbackMessage.style.color = 'red';
        }
    });

    const nextPuzzleBtn = document.getElementById('next-puzzle-btn');
    if (nextPuzzleBtn) {
        nextPuzzleBtn.addEventListener('click', () => {
            window.location.href = 'code_to_heart.html';
            // Here you would add logic to navigate to the next puzzle or unlock new content
        });
    }

    

    // Automatic navigation for letter-boxes
    const letterBoxes = document.querySelectorAll('.letter-box');
    letterBoxes.forEach((box, index) => {
        box.addEventListener('input', () => {
            if (box.value.length === box.maxLength) {
                // Move to the next letter-box
                if (index < letterBoxes.length - 1) {
                    letterBoxes[index + 1].focus();
                }
            }
        });

        box.addEventListener('keydown', (event) => {
            const currentRow = box.closest('.crossword-row');
            const currentRowBoxes = Array.from(currentRow.querySelectorAll('.letter-box'));
            const currentBoxIndexInRow = currentRowBoxes.indexOf(box);
            const allRows = Array.from(document.querySelectorAll('.crossword-row'));
            const currentRowIndex = allRows.indexOf(currentRow);

            switch (event.key) {
                case 'ArrowRight':
                    if (currentBoxIndexInRow < currentRowBoxes.length - 1) {
                        currentRowBoxes[currentBoxIndexInRow + 1].focus();
                    } else if (currentRowIndex < allRows.length - 1) {
                        // Move to the first box of the next row
                        allRows[currentRowIndex + 1].querySelector('.letter-box').focus();
                    }
                    break;
                case 'ArrowLeft':
                    if (currentBoxIndexInRow > 0) {
                        currentRowBoxes[currentBoxIndexInRow - 1].focus();
                    } else if (currentRowIndex > 0) {
                        // Move to the last box of the previous row
                        const prevRowBoxes = Array.from(allRows[currentRowIndex - 1].querySelectorAll('.letter-box'));
                        prevRowBoxes[prevRowBoxes.length - 1].focus();
                    }
                    break;
                case 'ArrowDown':
                    if (currentRowIndex < allRows.length - 1) {
                        const nextRowBoxes = Array.from(allRows[currentRowIndex + 1].querySelectorAll('.letter-box'));
                        if (nextRowBoxes[currentBoxIndexInRow]) {
                            nextRowBoxes[currentBoxIndexInRow].focus();
                        } else {
                            // If the next row is shorter, go to its last box
                            nextRowBoxes[nextRowBoxes.length - 1].focus();
                        }
                    }
                    break;
                case 'ArrowUp':
                    if (currentRowIndex > 0) {
                        const prevRowBoxes = Array.from(allRows[currentRowIndex - 1].querySelectorAll('.letter-box'));
                        if (prevRowBoxes[currentBoxIndexInRow]) {
                            prevRowBoxes[currentBoxIndexInRow].focus();
                        } else {
                            // If the previous row is shorter, go to its last box
                            prevRowBoxes[prevRowBoxes.length - 1].focus();
                        }
                    }
                    break;
            }
        });
    });
});