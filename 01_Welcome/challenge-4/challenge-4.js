export function findMissingLetter(inputArray) {
    let asciiArray = [];
    let missingLetter = -1;
    inputArray.forEach((character) => {
        asciiArray.push(character.charCodeAt(0));
    });
    for (let i = 0; i < asciiArray.length; i++) {
        if (Math.abs(asciiArray[i + 1] - asciiArray[i]) > 1) {
            missingLetter = asciiArray[i] + 1;
        }
    }
    return String.fromCharCode(missingLetter);
}
