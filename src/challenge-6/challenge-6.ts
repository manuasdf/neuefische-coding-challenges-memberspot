const numberRows:number = 50;
const numberColumns:number = 50;
const dead:string = "·";
const alive:string = "0";

var petriDish: boolean[][];

function createPetriDish() {
    petriDish = Array.from({ length: numberRows }, () =>
        Array.from({ length: numberColumns }, () => false));
}

function growBiofilm() {
    for (let i = 0; i < numberRows; i++) {
        for (let j = 0; j < numberColumns; j++) {
            petriDish[i][j] = Math.random() < 0.5;
        }
    }
}

function runEvolution() {
    const newPetriDish: boolean[][] = Array.from({ length: numberRows }, () =>
    Array.from({ length: numberColumns }, () => false));

    for (let i = 0; i < numberRows; i++) {
        for (let j = 0; j < numberColumns; j++) {
            let neighbours:number = 0;
            const borderRight: number = numberColumns-1;
            const borderBottom: number = numberRows-1;

            if (i > 0 && petriDish[i-1][j]) {
                neighbours += 1;
            }
            if (j > 0 && petriDish[i][j-1]) {
                neighbours += 1;
            }
            if (i > 0 && j > 0 && petriDish[i-1][j-1]) {
                neighbours += 1;
            }
            if (i < borderBottom && petriDish[i+1][j]) {
                neighbours += 1;
            }
            if (j < borderRight && petriDish[i][j+1]) {
                neighbours += 1;
            }
            if (i < borderBottom && j < borderRight && petriDish[i+1][j+1]) {
                neighbours += 1;
            }
            if (i > 0 && j < borderRight && petriDish[i-1][j+1]) {
                neighbours += 1;
            }
            if (j > 0 && i < borderBottom && petriDish[i+1][j-1]) {
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
    let grid:string = "";
    for (let i = 0; i < numberRows; i++) {
        for (let j = 0; j < numberColumns; j++) {
            if (petriDish[i][j] === false)
                grid += dead;
            else if (petriDish[i][j] === true)
                grid += alive;
        }
        grid += "\n"
    }
    console.clear();
    console.log(grid);
}


createPetriDish();
growBiofilm();
setInterval(() => {
    runEvolution();
    renderDish();
}, 380);




