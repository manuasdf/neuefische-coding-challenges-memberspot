import type {
    Product,
    Currency,
    Category,
    Customer,
    Item,
    Order
} from './types.js';

import {
    orderTotal,
    formatOrder,
    isInStock
} from './types.js'

import data from './data.json' with { type: "json" };

console.log(formatOrder(data.orders[0]));
console.log(formatOrder(data.orders[1]));
