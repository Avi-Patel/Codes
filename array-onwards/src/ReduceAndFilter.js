import "./styles.css";

document.getElementById("app").innerHTML = ``;

// const arr = [
//   {
//     rating: 7,
//     title: "abc",
//     id: "abc"
//   },
//   {
//     rating: 8,
//     title: "def",
//     id: "def"
//   },
//   {
//     rating: 9,
//     title: "xyz",
//     id: "xyz"
//   }
// ];

// const callback = function (movie) {
//   if (movie.rating > 7) {
//     return true;
//   } else {
//     return false;
//   }
// };

// console.log(
//   arr.filter(callback).map((x) => {
//     // let a = { rating: x.rating, title: x.title };
//     return { rating: x.rating, title: x.title };
//   })
// );

let a = [1, 2, 3, 4, 5];

// const myFilter = function (array, callback) {
//   let result = [];
//   for (let ele of array) {
//     if (callbackFilter(ele)) {
//       result.push(ele);
//     }
//   }
//   return result;
// };
// const callbackFilter = function (input) {
//   return input > 2;
// };

// console.log(myFilter(a, callbackFilter));

// const callbackReduce1 = function (input, sum) {
//   return sum + input;
// };

// console.log(a.reduce(callbackReduce1, 10));

//myReduce function
const myReduce = function (array, callback, initial = 0) {
  let result = initial;
  for (let ele of array) {
    result = callback(ele, result);
  }
  return result;
};

const callbackReduce = function (input, sum) {
  return input + sum;
};

console.log(myReduce(a, callbackReduce, 10));
