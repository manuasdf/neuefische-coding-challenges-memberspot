import { orderlyString } from './challenge-3.js';
const testStrings = [
    "is2 Thi1s T4est 3a",
    "4of Fo1r pe6ople g3ood th5e the2",
    ""
];
testStrings.forEach((testString) => {
    console.log(testString + " --> " + orderlyString(testString));
});
