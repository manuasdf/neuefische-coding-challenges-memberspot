import { readStatus } from './challenge-1.js';
const mock_input_1 = [
    {
        username: 'David',
        status: 'online',
        lastActivity: 10
    },
    {
        username: 'Lucy',
        status: 'offline',
        lastActivity: 22
    },
    {
        username: 'Bob',
        status: 'online',
        lastActivity: 104
    }
];
const mock_input_2 = [
    {
        username: 'Lucy',
        status: 'offline',
        lastActivity: 22
    },
    {
        username: 'Bob',
        status: 'online',
        lastActivity: 104
    }
];
const test_output_1 = {
    online: [
        'David'
    ],
    offline: [
        'Lucy'
    ],
    away: [
        'Bob'
    ]
};
const test_output_2 = {
    offline: ['Lucy'],
    away: ['Bob']
};
console.log((readStatus(mock_input_1)));
console.log((readStatus(mock_input_2)));
