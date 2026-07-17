export interface Product {
    readonly id: number,
    name: string,
    price: Currency,
    stockCount: number
}

export interface Currency {
    value: number,
    currency: string
}

export interface Category {
    name: string,
    description?: string,
    products: Product[]
}

export interface Customer {
    id: number,
    name: string,
    email: string
}

export interface Item {
    quantity: number,
    product: Product
}

export interface Order {
    status: string,
    customerId: number,
    items: Item[]
}


// the total price across all line items
export function orderTotal(order: Order): number {
    let priceTotal:number = 0.0;
    order.items.forEach((item) => {
        priceTotal += item.quantity * item.product.price.value;
    })
    return priceTotal;
}

// a readable summary of the order
export function formatOrder(order: Order): string {
    let orders: string = "";
    orders += `Order from Customer-ID: ${order.customerId}\n`;
    orders += `Status of the order: ${order.status}\n`;
    order.items.forEach((item: Item) => {
        orders += `${item.product.id}: ${item.quantity} x ${item.product.name} for ${item.product.price.value} ${item.product.price.currency}\n`;
    });
    orders += `Total price of the order: ${orderTotal(order)}`;
    return orders;
}

// whether the product has stock available
export function isInStock(product: Product): boolean {
    return product.stockCount > 0 ? true : false;
}

