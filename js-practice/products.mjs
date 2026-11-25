const PRODUCTS = [
    { name: 'Carrot - 1 Kg', price: 56 },
    { name: 'Tomato - 1 Kg', price: 16 },
    { name: 'Capsicum', price: 60 },
    { name: 'Cashews - 1 Kg', price: 650 },
];

// 14a-1: names without weight
console.log('---- 14a-1. Names without weight:');

// 1. empty list
let shortNames = [];

for (const product of PRODUCTS) {
    // 2. cut the name
    const shortName = product.name.split(' -')[0];

    // 3. add it to the list
    shortNames.push(shortName);

    // 4. print once, after the loop
    console.log(shortNames);
    console.log('List: ' + shortNames.join(','));
};


// 14a-2: sum of all prices
console.log('---- 14a-2. Sum of all prices:');
let total = 0;
for (let i = 0; i < PRODUCTS.length; i++) {
    total = total + PRODUCTS[i].price;
}
console.log(`Total is ${total}`);


// 14a-3: the includes has 'ca'
console.log('---- 14a-3. This product includes "ca"');
let list = [];

for (const product of PRODUCTS) {
    if (product.name.toLowerCase().includes('ca')) {
        const name = product.name.split(' -')[0];
        // add it to the list
        list.push(name);
    }
}
// print once, after the loop
console.log(list);
console.log('List: ' + list.join(','));


// 14a-4: the most expensive product
console.log('---- 14a-4. The most expensive product');
let mostExpensive = PRODUCTS[0];

for (const product of PRODUCTS) {
    // first product is the champion at the start
    if (product.price > mostExpensive.price) {
        // compare with the champion, not the neighbour
        mostExpensive = product;
    }
}
// print the result
console.log(`Most expensive: ${mostExpensive.name} (${mostExpensive.price})`);
