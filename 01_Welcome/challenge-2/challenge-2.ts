export function maskify(maskee: string): string {
    if (maskee.length < 4) {
        return maskee;
    }
    let tail: string = maskee.slice(-4);
    let head: string = '#'.repeat(maskee.length-4);

    return head + tail;
}
