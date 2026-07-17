// the total price across all line items
export function orderTotal(order) {
    let priceTotal = 0.0;
    order.items.forEach((item) => {
        priceTotal += item.quantity * item.product.price.value;
    });
    return priceTotal;
}
// a readable summary of the order
export function formatOrder(order) {
    let orders = "";
    orders += `Order from Customer-ID: ${order.customerId}\n`;
    orders += `Status of the order: ${order.status}\n`;
    order.items.forEach((item) => {
        orders += `${item.product.id}: ${item.quantity} x ${item.product.name} for ${item.product.price.value} ${item.product.price.currency}\n`;
    });
    orders += `Total price of the order: ${orderTotal(order)}`;
    return orders;
}
// whether the product has stock available
export function isInStock(product) {
    return product.stockCount > 0 ? true : false;
}
//# sourceMappingURL=types.js.map