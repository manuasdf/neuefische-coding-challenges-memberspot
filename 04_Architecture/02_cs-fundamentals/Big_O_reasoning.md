# Big O reasoning

Each snippet below takes an array arr of length n. Assign a Big O complexity class to each one and write a sentence justifying your answer.

```
// snippet 1
function first(arr) {
  return arr[0];
}
```
=> O(1)

```
// snippet 2
function second(arr) {
  let total = 0;
  for (const value of arr) {
    total += value;
  }
  return total;
}
```
=> O(n)

```
// snippet 3
function third(arr) {
  for (const a of arr) {
    for (const b of arr) {
      if (a === b) console.log(a);
    }
  }
}
```
=> O(n^2)

```
// snippet 4
function fourth(arr) {
  for (const value of arr) {
    for (let i = 0; i < 10; i++) {
      console.log(value, i);
    }
  }
}
```
=> O(n*c) = O(n)

```
// snippet 5
function fifth(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return [...fifth(arr.slice(0, mid)), ...fifth(arr.slice(mid))];
}
```
=> O(log n)
