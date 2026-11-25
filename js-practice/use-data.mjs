// Poganjaš z: node js-practice/use-data.mjs
import { SHOP, ALL_PRODUCTS_COUNT, NO_MATCH, SEARCHES, CA_NAMES } from '../js-practice/data.mjs';

//E1
console.log('----E1. Shop GreenKart has 30 products:');
console.log(`Shop ${SHOP} has ${ALL_PRODUCTS_COUNT} products!`);

//E2
console.log('----E2. Search "xyz" shows: Sorry, no products matched your search:');
console.log(`Search ${NO_MATCH.term} shows: ${NO_MATCH.message}`);

//E3
console.log('----E3. Import SEARCHES with for...of and print out the result:');
for (const search of SEARCHES) {
    console.log(`If searching with '${search.term}' you get ${search.expectedCount} products.`);
}

//E4
console.log('----E4. import CA_NAMES and print out each name in new row with number:');
for (let i = 0; i < CA_NAMES.length; i++) {
    console.log(`${i + 1}. ${CA_NAMES[i]}`);
}

//E5 
console.log('----E5. Count all expectedCount from SEARCHES and print it out:');
let total = 0;
for (const search of SEARCHES) {
    total = total + search.expectedCount;
}
console.log(`All searches together: ${total} products.`);
