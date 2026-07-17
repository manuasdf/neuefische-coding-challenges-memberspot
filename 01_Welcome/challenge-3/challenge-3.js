export function orderlyString(unsortedString) {
    let explodedString = unsortedString.split(" ");
    let orderedString = [];
    explodedString.forEach((searchString) => {
        let position = searchString.search(/\d/);
        let order = parseInt(searchString[position]);
        orderedString[order - 1] = searchString;
    });
    return orderedString.join(' ');
}
