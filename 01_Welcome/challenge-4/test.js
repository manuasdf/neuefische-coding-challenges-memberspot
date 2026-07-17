import { findMissingLetter } from './challenge-4.js';
const testStrings = [
    ['a', 'b', 'c', 'd', 'f'],
    ['O', 'Q', 'R', 'S'],
    ['a', 'c']
];
testStrings.forEach((testString) => {
    console.log(testString + " -> " + findMissingLetter(testString));
});
