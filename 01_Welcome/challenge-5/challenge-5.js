export function printLikes(namesArray) {
    if (namesArray.length > 3) {
        return `${namesArray[0]}, ${namesArray[1]} and ${namesArray.length - 2} others like this`;
    }
    switch (namesArray.length) {
        case 0:
            return "no one likes this";
        case 1:
            return `${namesArray[0]} likes this`;
        case 2:
            return `${namesArray[0]} and ${namesArray[1]} like this`;
        case 3:
            return `${namesArray[0]}, ${namesArray[1]} and ${namesArray[2]} like this`;
    }
    return "";
}
