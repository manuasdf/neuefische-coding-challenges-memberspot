import { printLikes } from './challenge-5.js';
const testArrays = [
    [],
    ["Peter"],
    ["Jacob", "Alex"],
    ["Max", "John", "Mark"],
    ["Alex", "Jacob", "Mark", "Max"]
];
testArrays.forEach((testArray) => {
    console.log(testArray + " -> " + printLikes(testArray));
});
