console.log('------Exercise 1 A-------------');
// Exercise 1 A
for (let i = 1; i <= 5; i++) {
    console.log(`Number ${i}`);
}
console.log('-------Exercise 2 A------------');

// Exercise 2 A
for (let i = 5; i >= 1; i--) {
    console.log(`Number ${i}`);
}
console.log('------Exercise 3 A-------------');

// Exercise 3 A
const prices = [10, 25, 7, 40];
// Item 0 costs 10
// Item 1 costs 25
// Item 2 costs 7
// Item 3 costs 40
for (let i = 0; i < prices.length; i++) {
    console.log(`Item ${i} costs ${prices[i]}`);
}
console.log('-------Exercise 4 A------------');

// Exercise 4 A
let total = 0;
for (let i = 0; i < prices.length; i++) {
    total = total + prices[i];
    console.log(`Total is ${total}`);
}
console.log('------Exercise 5 B  for + if-------------');

// Exercise 5 B  for + if
for (let i = 0; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log(`Number ${i}`);
    }
}
console.log('------Exercise 6 B: Find in array-------------');

// Exercise 6 B: Find in array
const fruits = ['Apple', 'Banana', 'Carrot'];
const searched = 'Banana';
for (let i = 0; i < fruits.length; i++) {
    if (searched === fruits[i]) {
        console.log(`${searched} found at index ${i}`);
    }
}
console.log('-------Exercise 7 B :radio button ------------');

// Exercise 7 B :radio button 
const selected = 1;
// Button 0 is NOT selected
// Button 1 IS selected
// Button 2 is NOT selected
for (let i = 0; i < 3; i++) {
    if (selected === i) {
        console.log(`Button ${i} IS selected`);
    } else {
        console.log(`Button ${i} is NOT selected`);
    }
}
console.log('------Exercise 8 B: radio button, whole-------------');

// Exercise 8 B: radio button, whole
const buttons = [0, 1, 2];

for (let i = 0; i < buttons.length; i++) {
    const selectedButton = buttons[i];
    console.log(`--- click button ${selectedButton} ---`);
    for (let j = 0; j < buttons.length; j++) {
        if (buttons[j] === selectedButton) {
            console.log(`Button ${j} is selected`);
        } else {
            console.log(`Button ${j} is NOT selected`);
        }
    }
}

console.log('------Exercise 9 B: Multiplication table-------------');

// Exercise 9 B: Multiplication table
const table = [1, 2, 3];

for (let i = 0; i < table.length; i++) {
    const selectedNumber = table[i];
    console.log(`--- ${selectedNumber} times table ---`);
    for (let j = 0; j < table.length; j++) {
        console.log(`${selectedNumber} x ${table[j]} = ${selectedNumber * table[j]}`);
    }
}
console.log('------Exercise 10 B:  is the list sorted?-------------');

// Exercise 10 B: is the list sorted?
// [3, 5, 8, 12], [3, 9, 8, 12]
const numbers1 = [3, 5, 8, 12];
let isSorted = true;

// for every pair of neighbours
for (let i = 0; i < numbers1.length - 1; i++) {
    if (numbers1[i] > numbers1[i + 1]) {
        console.log(`Left is bigger than right: ${numbers1[i]} > ${numbers1[i + 1]}`);
        isSorted = false;
    }
}
// print the result
if (isSorted) {
    console.log('List is sorted');
} else {
    console.log('List is NOT sorted');

}
console.log('---------Exercise----------');

for (let i = 0; i <= 2; i++) {
    console.log("Hello");
}

console.log('---------Exercise----------');

for (let i = 0; i <= 2; i++) {
    console.log(`Number:${i}`);
}
console.log('---------Exercise----------');

const fruits1 = ['Apple', 'Banana', 'Carrot'];
const favorite = 'Banana';
for (let i = 0; i < fruits1.length; i++) {
    if (fruits1[i] === favorite) {
        console.log(`Your favorite fruit ${favorite} found at index ${i}`)
    }
}

console.log('---------Exercise----------');

const colour = ['red', 'blue'];
const size = ['S', 'M'];

for (let i = 0; i < colour.length; i++) {
    //console.log(`Colour: ${colour[i]}`);
    for (let j = 0; j < size.length; j++) {
        console.log(`Colour ${colour[i]} has size: ${size[j]}`);
    }
}

console.log('---------Exercise----------');
const colour2 = ['red', 'blue'];
const size2 = ['S', 'M'];
const soldOut = 'blue M';


for (let i = 0; i < colour2.length; i++) {
    for (let j = 0; j < size2.length; j++) {
        const combination = `${colour2[i]} ${size2[j]}`;
        if (combination === soldOut) {
            console.log(`${colour2[i]} ${size2[j]} - is sold out`);
        } else {
            console.log(`Colour ${colour2[i]} has size: ${size2[j]}`);
        }
    }
}

console.log('---------Exercise----------');
const colour3 = ['red', 'blue'];
const size3 = ['S', 'M'];
const soldOut3 = 'blue M';

for (let i = 0; i < colour2.length; i++) {
    for (let j = 0; j < size2.length; j++) {
        if (colour2[i] === 'blue' && size2[j] === 'M') {
            console.log(`${colour2[i]} ${size2[j]} - is sold out`);
        } else {
            console.log(`Colour ${colour2[i]} has size: ${size2[j]}`);
        }
    }
}