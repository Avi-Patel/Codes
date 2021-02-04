console.log("Before");

setTimeout(() => {
  console.log("1st TO");
}, 5000);

setTimeout(() => {
  console.log("2nd TO");
}, 2000); // change to 10s

console.log("After");
