function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j+1] = arr[j];
            j = j - 1;
        }
        arr[j+1] = current;
    }
    return arr;
}

console.log(insertionSort([5, 2, 4, 6, 1, 3]));
// → [1, 2, 3, 4, 5, 6]
console.log(insertionSort([1, 2, 3, 4, 5]));
console.log(insertionSort([5, 4, 3, 2, 1]));
console.log(insertionSort([42]));
