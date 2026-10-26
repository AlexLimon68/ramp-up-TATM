
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

setTimeout(() => {
    console.log("2");
}, 5000);

setTimeout(() => {
    console.log("3");
}, 2000);

console.log("C");
console.log("D");

