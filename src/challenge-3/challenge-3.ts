export function orderlyString(unsortedString: string): string {
    let explodedString: string[] = unsortedString.split(" ");
    let orderedString: string[] = [];

    explodedString.forEach((searchString) => {
        let position:number = searchString.search(/\d/);
        let order:number = parseInt(searchString[position]);
        orderedString[order-1] = searchString;
    });

    return orderedString.join(' ');
}
