"use strict";
const numberRows = 50;
const numberColumns = 50;
const dead = " ";
const alive = "█";
var petriDish;
function createPetriDish() {
    petriDish = Array.from({ length: numberRows }, () => Array.from({ length: numberColumns }, () => false));
}
function growBiofilm() {
    for (let i = 0; i < numberRows; i++) {
        for (let j = 0; j < numberColumns; j++) {
            petriDish[i][j] = Math.random() < 0.5;
        }
    }
}
function runEvolution() {
    const newPetriDish = Array.from({ length: numberRows }, () => Array.from({ length: numberColumns }, () => false));
    for (let i = 0; i < numberRows; i++) {
        for (let j = 0; j < numberColumns; j++) {
            let neighbours = 0;
            const borderRight = numberColumns - 1;
            const borderBottom = numberRows - 1;
            if (i > 0 && petriDish[i - 1][j]) {
                neighbours += 1;
            }
            if (j > 0 && petriDish[i][j - 1]) {
                neighbours += 1;
            }
            if (i > 0 && j > 0 && petriDish[i - 1][j - 1]) {
                neighbours += 1;
            }
            if (i < borderBottom && petriDish[i + 1][j]) {
                neighbours += 1;
            }
            if (j < borderRight && petriDish[i][j + 1]) {
                neighbours += 1;
            }
            if (i < borderBottom && j < borderRight && petriDish[i + 1][j + 1]) {
                neighbours += 1;
            }
            if (i > 0 && j < borderRight && petriDish[i - 1][j + 1]) {
                neighbours += 1;
            }
            if (j > 0 && i < borderBottom && petriDish[i + 1][j - 1]) {
                neighbours += 1;
            }
            if (petriDish[i][j]) {
                if (neighbours < 2) {
                    newPetriDish[i][j] = false;
                }
                else if (neighbours === 2 || neighbours === 3) {
                    newPetriDish[i][j] = true;
                }
                else if (neighbours > 3) {
                    newPetriDish[i][j] = false;
                }
            }
            else if (!petriDish[i][j] && neighbours === 3) {
                newPetriDish[i][j] = true;
            }
        }
    }
    petriDish = newPetriDish;
}
function renderDish() {
    let grid = "";
    grid += " ┏";
    grid += "━".repeat(numberColumns + 2);
    grid += "┓\n";
    for (let i = 0; i < numberRows; i++) {
        grid += " ┃ ";
        for (let j = 0; j < numberColumns; j++) {
            if (petriDish[i][j] === false)
                grid += dead;
            else if (petriDish[i][j] === true)
                grid += alive;
        }
        grid += " ┃\n";
    }
    grid += " ┗";
    grid += "━".repeat(numberColumns + 2);
    grid += "┛";
    console.clear();
    console.log(grid);
}
createPetriDish();
growBiofilm();
setInterval(() => {
    runEvolution();
    renderDish();
}, 360);
