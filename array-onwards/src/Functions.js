// const fun1 = function (x) {
//   return x * x;
// };

// console.log(fun1(2));

//doubt
// const s = (function () {
//   return !this;
// })();
// console.log(s);

// (function ab() {
//   "use strict";
//   console.log(this);
// })();

// (function ab() {
//   console.log(this);
// })();

// const a = () => {
//   console.log("arrow non-strict mode", this);
// };
// a();

// const b = () => {
//   "use strict";
//   console.log(this);
// };
// b();

// function cons() {
//   console.log(this);
//   // return { x: 1 };
// }
// let a = new cons();
// console.log(a);

// function temp() {
//   console.log("ksdnq");
// }

//strict mode
// console.log(
//   (function () {
//     return !this;
//   })()
// );

// let o = {
//   op1: 1,
//   op2: 2,
//   diff() {
//     this.difference = this.op1 - this.op2;
//     const f = function () {
//       console.log(this === o);
//     }.bind(this);
//     f();
//   }
// };
// o.diff(); // invocation context is object  o
// console.log(o.difference);
// o.op1 = 3;

// let a = new o.diff(); // invocation context is object a

// const f = function (x, y = Math.sqrt(x)) {
//   console.log(y);
//   return Math.sqrt(x * x + y * y);
// };
// console.log(f(3));

// const f = function (x, y) {
//   return Math.sqrt(x * x + y * y);
// };

// f["Firstname"] = this;
// f["Clg"] = "DAIICT";
// console.log(f(3, 4));

// console.log(f.Firstname);
// console.log(f.Clg);

// const f = function (initial = 0, ...rest) {
//   let sum = initial;
//   console.log(rest); // already defined as empty array
//   for (let i of rest) sum += i;
//   return sum;
// };

// console.log(f(10));

// function timed(f) {
//   return function (...args) {
//     console.log(`Entering function ${f.name}`);
//     let startTime = new Date.now();
//     try {
//       return f(...args);
//     } finally {
//       console.log(`Exiting ${f.name} after ${Date.now() - startTime}`);
//     }
//   };
// }

// function benchmark(n) {
//   let sum = 0;
//   for (let i = 1; i <= n; i++) {
//     sum += i;
//   }
//   return sum;
// }

// console.log(timed(benchmark(10000)));

// function fun1(x, y) {
//   return x.x1 + x.y1 + y.x1 + y.y1;
// }
// console.log(fun1({ x1: 1, y1: 1 }, { x1: 2, y1: 2 }));

// function fun1({ x1, y1 }, { x1: x2, y1: y2 }) {
//   return x1 + y1 + x2 + y2;
// }
// console.log(fun1({ x1: 1, y1: 1 }, { x1: 2, y1: 2 }));

// function fun1([id1, id2, ...ids], [name1, name2, ...names]) {
//   let result = [];
//   console.log(ids, names);
//   names.forEach((name, i) => {
//     result.push({ name: name, id: ids[i] });
//   });
//   return result;
// }
// const ids = [1, 2, 3, 4, 5, 6, 7, 8];
// const names = ["ab", "ab", "ab", "ab", "ab", "ab", "ab", "ab"];
// console.log(fun1(ids, names));

// function drawCircle({ x, y, radius, color: [r, g, b] }) {
//   return {
//     x: y,
//     y: y,
//     radius: radius,
//     rcolor: r,
//     gcolor: g,
//     bcolor: b
//   };
// }
// console.log(drawCircle({ x: 3, y: 4, radius: 5, color: [255, 210, 40] }));

// let fun1 = function () {
//   let counter = 0;
//   function increment() {
//     return counter++;
//   }
//   return increment();
// };
// console.log(fun1());
// console.log(fun1());

// let fun2 = (function () {
//   let counter = 0;
//   return function () {
//     return counter++;
//   };
// })();
// console.log(fun2(), fun2());

// function fun1() {
//   console.log(this);
//   let funs1 = [],
//     funs2 = [];
//   for (let i = 0; i < 10; i++) {
//     funs1[i] = () => i;
//   }
//   for (var i = 0; i < 10; i++) {
//     funs2[i] = () => i;
//   }
//   return [funs1, funs2];
// }
// let funs = fun1();
// console.log(funs[0][5](), funs[1][5]());
// console.log(fun1.length);

// let a = { x: 1, y: 2 };
// funs = fun1.call(a);
// console.log(a);

// const fun = (y) => {
//   return this.x + y; //this will not be in context of object 'a'
// };
// let a = { x: 1 };
// let p = fun.bind(a);
// console.log(p(2)); // error

// function not(f) {
//   return function (...args) {
//     console.log(this);
//     const result = f.apply(this, args);
//     return !result;
//   };
// }

// const even = (x) => {
//   console.log(this);
//   return x % 2 === 0;
// };
// const odd = not(even);
// [1, 3, 5, 7, 9].every(odd);

// let o = {
//   foo: "Hello",
//   constf: () => {
//     const a = () => {
//       console.log(this);
//     };
//     a();
//     console.log("abc", this);
//   }
// };
// o.constf();

// let o1 = {
//   foo: "Hello",
//   constf: function () {
//     console.log("ab", this);
//   }
// };
// o1.constf();

// let o = {
//   foo: "hello",
//   fun: function () {
//     console.log(this);
//     (() => {
//       console.log(this);
//       (() => {
//         console.log(this);
//         (() => {
//           console.log(this);
//           (() => {
//             console.log(this);
//           })();
//         })();
//       })();
//     })();
//   }
// };
// o.fun();

// let o = {
//   foo: "hello",
//   fun: function () {
//     console.log(this);
//     (function () {
//       console.log(this);
//       (function () {
//         console.log(this);
//         (function () {
//           console.log(this);
//           (function () {
//             console.log(this);
//           })();
//         })();
//       })();
//     })();
//   }
// };
// o.fun();

// let o = {
//   foo: "hello",
//   fun: function () {
//     console.log(this);
//     (() => {
//       console.log(this);
//       (function () {
//         console.log(this);
//       })();
//     })();
//   }
// };
// o.fun();

// let o = {
//   foo: "hello",
//   fun: () => {
//     console.log(this);
//     (() => {
//       console.log(this);
//       (function () {
//         console.log(this);
//       })();
//     })();
//   }
// };
// o.fun();

// let o = {
//   foo: "hello",
//   fun: () => {
//     console.log(this);
//     (() => {
//       console.log(this);
//       (function () {
//         console.log(this);
//       }.bind(o)());
//     })();
//   }
// };
// o.fun();

// function left(fun, ...leftArgs) {
//   return (...rightArgs) => {
//     const args = [...leftArgs, ...rightArgs];
//     console.log(`abc  ${this}`);
//     // return fun(...args);
//     // return fun.call(this, ...args);
//     return fun.apply(this, args);
//   };
// }

// const f = (a, b, c, d, e) => {
//   return a + b + c + d + e;
// };
// const fun1 = left(f, 1, 2, 3);
// console.log(fun1(4, 5));

// let obj1 = {
//   food: "pizza",
//   place: "ahmedabad",
//   order: () => {
//     //how to print food,place here?
//     console.log(obj1.food, obj1.place);
//   }
// };
// obj1.order();

// console.log(this === module.strict);

// function ab(x) {
//   return function abc(y) {
//     return x + y;
//   };
// }
// const a = ab(1);
// const x = 10;
// console.log(a(2));

// let x = "abcd";
// String.prototype.toMycase = () => {
//   return this.split("")
//     .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
//     .join("");
// };
// console.log(x.toMycase());

// let x = "abcd";
// String.prototype.toMycase = function () {
//   return this.split("")
//     .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
//     .join("");
// };
// console.log(x.toMycase());
// console.log(x);

// function func(input) {
//   input = { x: 2 };
//   // input.x = 2;
// }
// const x = { x: 1 };
// func(x);
// console.log(x);

// function func(x) {
//   x = 2;
// }
// const x = 1;
// func(x);
// console.log(x);

// function func({ x, y }) {
//   x = 2;
//   y = 2;
// }
// const a = { x: 1, y: 1 };
// func(a);
// console.log(a.x, a.y);

// function func({ x, y }) {
//   x.foo = 2;
//   y.bar = 2;
// }
// const a = { x: { foo: 1 }, y: { bar: 1 } };
// func(a);
// console.log(a.x, a.y);

// let cel = 10;
// function cToF() {
//   return this * (9 / 5) + 32;
// }
// Number.prototype.cToF = cToF;
// console.log(cel.cToF());

// let obj = {
//   x: 1,
//   func: function () {
//     console.log("hello");
//     console.log(this);
//   }
// };
// const temp = obj.func;
// temp();
