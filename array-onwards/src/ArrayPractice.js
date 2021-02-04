import "./styles.css";

document.getElementById("app").innerHTML = ``;

// let a = [10, 20, 30, 40, 50, 60];
// let sum = 0;
// a.forEach((value) => {
//   let sum = 0;
//   sum += value;
// });
// console.log(sum);

// let b = Array.of(a);

// console.log(a === b);
// b = Array.from(a);
// console.log(a === b);

// let a = [1, 2, { x: 1, y: 2 }];
// let b = [...a];

// //shallow copy
// console.log(a[2] === b[2]); //true

//invalid array length, RangeError
// let a = new Array(-1);

// let a = new Array();
// console.log(a[1]);

// let a = [1, 2, { x: 1, y: 1 }];
// let b = Array.from(a, (x) => {
//   return x * x;
// });
// console.log(a[2] === b[2]);
// console.log(b);

// let a = [1, 2, 3];
// a[4294967295] = 1; // unexpected token

// a["ab"] = 1;
// for (let i of a) console.log(i);
// for (let i in a) {
//   console.log(a[i]);
// }
// console.log(a.length);

// let a = [];
// console.log(a.pop());
// console.log(a.length);

// let a = [2, 1, 3];
// for (let i of a) console.log(i);

// let a = [1, 2, , , 3];
// console.log(
//   a.every((x) => {
//     return x > 0;
//   })
// );

// let b = new Set();
// b.add(1);
// b.add(2);
// let a = [1, 2, b];
// console.log(a.flat());

// let a = [1, 2, { x: 1, y: 1 }];
// let b = a.concat([4, 5, 6]);
// console.log(a[2] === b[2]);
// console.log(a[1] === b[1]);
// console.log(b);

// let a = [1, 2];
// console.log(a == [1, 2]); // false

// let a = [1, 2, 3, 4, 5];
// console.log(a.slice(3, 0)); // returns []

// a.sort(function (x) {
//   return false;
// }); // ignoring silently
// console.log(a);

// let a = [1, 2, , [3, 4]];
// console.log(JSON.stringify(a));
// console.log(a.join());
// console.log(a.toString());
// a["ab"] = 1;
// console.log(Array.isArray(a));
// console.log(a instanceof Array);
// console.log(a.length);

// let a = { p1: [1, 2], p2: [3, 4] };
// let { q1, q2 } = a;
// console.log({ p1: q1, p2: q2 } === a);
// console.log(q1);
