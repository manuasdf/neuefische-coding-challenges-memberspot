export function maskify(maskee) {
    if (maskee.length < 4) {
        return maskee;
    }
    let tail = maskee.slice(-4);
    let head = '#'.repeat(maskee.length - 4);
    return head + tail;
}
