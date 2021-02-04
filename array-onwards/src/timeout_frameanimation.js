/****************** 1 *******************/
// let i = 0;
// function loop() {
//   console.log("start");
//   new Promise((resolve) => {
//     resolve("Hi");
//   }).then((msg) => {
//     console.log(msg);
//     i++;
//     // if (i < 10) loop();
//   });
//   console.log("end");
// }
// console.log("before");
// loop();
/****************** 2 *******************/

// function loop() {
//   console.log("start");
//   setTimeout(() => {
//     console.log("Hi");
//     // loop();
//   }, 0);
//   console.log("end");
// }
// console.log("before");
// loop();

// /****************** 3 *******************/
// function loop() {
//   console.log("start");
//   requestAnimationFrame(() => {
//     console.log("Hi");
//     // loop();
//   });
//   console.log("end");
// }
// console.log("before");
// loop();

// /****************** 4 *******************/
// both rAF and setTimeOut runs asynchronoulsy. So sometime output will be
//"RAF 1 then timeout 1" and sometimes "timeout1 and RAF 1".
// function print(msg) {
//   return () => console.log(msg);
// }
// function timeoutRAF() {
//   requestAnimationFrame(print("RAF 1"));
//   setTimeout(print("timeout 1"), 0);
// }
// console.log("before");
// timeoutRAF();
// console.log("after");

// /****************** 5 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test1() {
//   setTimeout(print("timeout 2"), 0);
//   requestAnimationFrame(print("RAF 2"));
// }
// function test() {
//   setTimeout(console.log("timeout 1"), 0);
//   requestAnimationFrame(print("RAF 1"));
// }
// test();
// test1();

// /****************** 6 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(() => {
//     print("RAF 1")();
//     requestAnimationFrame(print("RAF 2"));
//   });
//   setTimeout(print("timeout 1"), 0);
// }
// test();

// /****************** 7 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(() => {
//     requestAnimationFrame(print("RAF 2"));
//     print("RAF 1")();
//   });
//   setTimeout(print("timeout 1"), 0);
// }
// test();

// /****************** 8 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(() => {
//     print("RAF 1")();
//     requestAnimationFrame(print("RAF 2"));
//     requestAnimationFrame(print("RAF 3"));
//   });
//   setTimeout(print("timeout 1"), 0);
// }
// test();

// /****************** 9 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(() => {
//     print("RAF 1")();
//     requestAnimationFrame(print("RAF 2"));
//     setTimeout(print("timeout 2"), 0);
//     requestAnimationFrame(print("RAF 3"));
//   });
//   setTimeout(print("timeout 1"), 0);
// }
// test();

// /****************** 10 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(() => {
//     print("RAF 1")();
//     requestAnimationFrame(print("RAF 2"));
//     setTimeout(print("timeout 2"), 0);
//     requestAnimationFrame(() => {
//       print("RAF 3")();
//       setTimeout(print("timeout 3"), 0);
//       requestAnimationFrame(print("RAF 4"));
//     });
//   });
//   setTimeout(print("timeout 1"), 0);
// }
// test();

// /****************** 11 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(print("RAF 1"));
//   setTimeout(print("timeout 1"), 0);
//   requestAnimationFrame(print("RAF 2"));
// }
// test();

// /****************** 12 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(print("RAF 1"));
//   setTimeout(print("timeout 1"), 0);
//   requestAnimationFrame(() => {
//     print("RAF 2")();
//     requestAnimationFrame(print("RAF 3"));
//   });
// }
// test();

// /****************** 13 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(() => {
//     print("RAF 1")();
//     requestAnimationFrame(print("RAF 4"));
//   });
//   setTimeout(print("timeout 1"), 0);
//   requestAnimationFrame(() => {
//     print("RAF 2")();
//     requestAnimationFrame(print("RAF 3"));
//   });
// }
// test();

// /****************** 14 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(() => {
//     print("RAF 1")();
//     requestAnimationFrame(print("RAF 4"));
//   });
//   setTimeout(() => {
//     print("timeout 1")();
//     setTimeout(print("timeout 2"), 0);
//   }, 0);
//   requestAnimationFrame(() => {
//     print("RAF 2")();
//     requestAnimationFrame(print("RAF 3"));
//   });
// }
// test();

// /****************** 15 *******************/
// function print(msg) {
//   return () => console.log(msg);
// }
// function test() {
//   requestAnimationFrame(() => {
//     print("RAF 1")();
//     requestAnimationFrame(print("RAF 4"));
//   });
//   setTimeout(() => {
//     print("timeout 1")();
//     requestAnimationFrame(print("RAF 5"));
//   }, 0);
//   requestAnimationFrame(() => {
//     print("RAF 2")();
//     requestAnimationFrame(print("RAF 3"));
//   });
// }
// test();

// let obj = {
//   x: 1,
//   y: [1, 2, 3],
//   func: function abc() {
//     console.log("func");
//   }
// };
// console.log(typeof obj.func);
// console.log(JSON.parse(JSON.stringify(obj)));
