export const BASE_URL = 'https://rahulshettyacademy.com/seleniumPractise/#/';

// number of products on the page at the start (from the manual check)
export const ALL_PRODUCTS_COUNT = 30;

// fill in expectedCount from your manual check
export const SEARCHES = [
    { term: 'ca', expectedCount: 4, expectedTotal: 826, names: ['Cauliflower', 'Carrot', 'Capsicum', 'Cashews'] },
    { term: 'be', expectedCount: 5, expectedTotal: 502, names: ['Cucumber', 'Beetroot', 'Beans', 'Raspberry', 'Strawberry'] },
    { term: 'ap', expectedCount: 3, expectedTotal: 192, names: ['Capsicum', 'Apple', 'Grapes'] },
    { term: 're', expectedCount: 1, expectedTotal: 950, names: ['Nuts Mixture'] },
    { term: 'ro', expectedCount: 4, expectedTotal: 283, names: ['Brocolli', 'Beetroot', 'Carrot', 'Mushroom'] },
    { term: 'tom', expectedCount: 1, expectedTotal: 16, names: ['Tomato'] },
];

// search with no result
export const NO_MATCH = {
    term: 'xyz', message: 'Sorry, no products matched your search!'
};

// bonus: product names for "ca" without the weight
export const CA_NAMES = ['Cauliflower', 'Carrot', 'Capsicum', 'Cashews'];

// case insensitive
export const SEARCHES_INSENSITIVE = [
    { term: 'ca', expectedCount: 4, names: ['Cauliflower', 'Carrot', 'Capsicum', 'Cashews'] },
    { term: 'CA', expectedCount: 4, names: ['Cauliflower', 'Carrot', 'Capsicum', 'Cashews'] }
]

// for cart test
export const CART = [
    { name: 'Tomato', expectedCards: 1, addedItems: 1, price: 16, sum: 16 },
    { name: 'Carrot', expectedCards: 1, addedItems: 2, price: 56, sum: 72 },
    { name: 'Beans', expectedCards: 1, addedItems: 3, price: 82, sum: 154 }
];

export const QUANTITY_ORDER = [
    { name: 'Tomato', quantity: 3, cards: 1, addedItems: 1, price: 16, sum: 48 },
]

