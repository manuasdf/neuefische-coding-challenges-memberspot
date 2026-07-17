import { maskify } from './challenge-2.js';
const testStrings = [
    '4556364607935616',
    '64607935616',
    '1',
    '',
    'Skippy',
    'Nananananananananananananananana Batman!'
];
testStrings.forEach((testString) => {
    console.log(testString + " --> " + maskify(testString));
});
