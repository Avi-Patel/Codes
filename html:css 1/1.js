// 'use strict';


// var x;
// let y; {
//     var x = 5;
//     let y = 10;
//     console.log(x, y);
// }
// console.log(x, y);


// console.log(-(2 ** 3));
// let a = "a";
// console.log(++a);
// a = "1";
// console.log(++a);

// let b = NaN;
// let c = NaN;
// console.log(b === c);

// console.log(null == undefined);
// console.log(0 == null)

// function do1() {
//     let x = 1;
//     eval("x=2")
//     console.log(x);
//     eval("let y=3; console.log(y)");
//     //console.log(y); will give reference error
//     eval("var y=3");
//     console.log(y);
// }
// do1();

// function do2() {
//     let x = 1;
//     eval(" 'use strict'; var y=3; x=3");
//     console.log(x);
//     console.log(y); // error
// }
// do2();
// let a = { x: 1, y: 2 };

// function do3() {
//     'use strict';
//     delete a;
// }
// do3();
// console.log(a.x);

// let a = [1, 2, 3, 4, null, 5, 6, 7];
// for (let ele of a) {
//     console.log(ele);
// }

// let a = {
//     "a": 1,
//     "b": 2,
//     "c": 3
// }
// for (prop in a) {
//     console.log(prop, a[prop]);
// }

// function* range(from, to) {
//     for (let i = from; i <= to; i++) {
//         yield i;
//     }
// }
// console.log(range(1, 10));

// "function do4(arg1) {
//     console.log(arg1);
//     if (arg1 === undefined) {
//         debugger
//         console.log(1);
//     };

//     console.log("qjdsqw");
// }
// var a;
// do4(a);"

// let a = { "x": 1, "y": 2 };
// let b = Object.create(a);
// b["z"] = 3;
// for (let name in b) {
//     console.log(name);
// }
// console.log(a.z.length) //Type error


// let a = {};
// let b = { x: 1, y: 2 };
// let c = { x: 3, y: 4 };
// Object.assign(a, b, c);
// console.log(a);
// console.log(b, c);

// let a = [1, 2, 3];
// console.log(a.toLocaleString());
// console.log(a.toString());

// let a = new Date;
// let b = JSON.stringify(a);
// console.log(a);
// console.log(JSON.parse(b));
// console.log(a.toJSON());
// console.log(a.valueOf());

// let a = { x: 1, y: 2, z: 3 };
// for (i in a) {
//     if (i == "x") {
//         a["w"] = 4;
//     }
//     console.log(i, a[i]);
// }

// let a = 1 + 2 + "sa";
// console.log(a);


// const extension = Symbol("my extension symbol");
// console.log(extension);
// let o = {
//     [extension]: { /* extension data stored in this object */ }
// };
// console.log(o[extension].x);
// o[extension].x = 0; // This won't conflict with other properties of o

// let a = { x: 1 };
// let b = Object.create(a);
// let c = {...b, y: 2 };
// b.y = 4;
// c = {...b };
// console.log(c);

// for (let i = (console.log('a') || 1); i <= (console.log('b') || 1); console.log('c')) {
//     i += console.log('d') || 1;
// }

// for in vs for of


// const fun1 = "m";
// const s1 = Symbol("new");
// let a = {
//     "myFun" (x) { return x + 1; },
//     [fun1](x) { return x + 2; },
//     [s1](x) { return x + 3; }
// };

// for (let i in a) {
//     console.log(i);
// }
// for (let i of a) {
//     console.log(i);
// }


// let o = {
//     dataProp: "ABC",
//     // An ordinary data property dataProp: value,
//     // An accessor property defined as a pair of functions.
//     get acc() { return this.dataProp; },
//     set put(value) { this.dataProp = value; }
// };
// o.put = "abc";
// console.log(o.acc);

// function check(x) {
//     try {
//         console.log(1);
//         return true;
//         console.log(2);
//     } catch {
//         return false;
//     } finally {
//         console.log("Great");
//     }
//     console.log("last line of fun");
// }

// function check(x) {

//     // throw "don't do that"; // code below this line is unreachable

//     try {
//         console.log(1);
//         throw "Check it";
//     } catch {
//         console.error("anksqs");
//         throw null;
//     } finally {
//         console.log("Great");
//     }
//     console.log("last line of fun");
// }


// function check(x) {

//     // throw "don't do that"; // code below this line is unreachable
//     try {
//         console.log(1);
//         throw "Check it";
//     } catch {
//         console.error("anksqs");
//         try {

//         } catch {

//         } finally {
//             return true;
//         }
//     } finally {
//         console.log("Great");
//     }
//     console.log("last line of fun");
// }


// function check(x) {
//     try {
//         console.log(1);
//         check1();

//         function check1() {
//             throw "can not this function!!";
//         }
//     } catch (e) {
//         console.error("anksqs : " + e);
//     } finally {
//         console.log("Great");
//     }
//     console.log("last line of fun");
// }
// check(1);

// try {
//     try {
//         throw new Error('oops');
//     } catch (ex) {
//         console.error('inner', ex.message);
//         throw ex;
//     } finally {
//         console.log('finally');
//     }
// } catch (ex) {
//     console.error('outer', ex.message);
// }


// (function() {
//     try {
//         try {
//             throw new Error('oops');
//         } catch (ex) {
//             console.error('inner', ex.message);
//             throw ex;
//         } finally {
//             console.log('finally');
//             return;
//         }
//     } catch (ex) {
//         console.error('outer', ex.message);
//     }
// })();

// (function check() {
//     console.log(this); // global object
// })();



// (function() {
//     "use strict";
//     //x = undefined; // reference error
//     //console.log(x);

//     // let var1 = "kjnwdq";
//     // delete var1; // not a

//     // let a = 010; // octal literal are not allowed 

//     // let eval = 100; // eval can  not be used as variable, function, function arguments name;

//     // eval("var a=2"); // can not define new varables in the scope it was called.
//     // console.log(a);

//     // console.log(this); // this is undefined in strict mode 
//     // console.log(1 + "1");

//     // let a = { x: 1, y: 2 }
//     // delete a.x;
//     // delete a.z;
//     // console.log(a.z);

//     // let a = { x: null, y: 1 }
//     // console.log(a.z);

// })();



// var x = 17;
// let obj = {};
// with(obj) { // !!! syntax error
//     // If this weren't strict mode, would this be var x, or
//     // would it instead be obj.x?  It's impossible in general
//     // to say without running the code, so the name can't be
//     // optimized.
//     x;
// }


// var x = 17;
// console.log(eval("'use strict'; var x = 42; x;"));
// console.log(x === 17);


// function strict1(str) {
//     'use strict';
//     return eval(str); // str will be treated as strict mode code
// }

// function strict2(f, str) {
//     'use strict';
//     return f(str); // not eval(...): str is strict if and only
//     // if it invokes strict mode
// }

// function nonstrict(str) {
//     return eval(str); // str is strict if and only
//     // if it invokes strict mode
// }

// console.log(strict1("'Strict mode code!'"));
// console.log(strict1("'use strict'; 'Strict mode code!'"));
// console.log(strict2(eval, "'Non-strict code.'"));
// console.log(strict2(eval, "'use strict'; 'Strict mode code!'"));
// console.log(nonstrict("'Non-strict code.'"));
// console.log(nonstrict("'use strict'; 'Strict mode code!'"));



//below all lines will throw syntax error
// var eval = 17;
// let argumenbts = 0;
// arguments++;


// function f(a) {
//     'use strict';
//     a = 42;
//     return [a, arguments[0]];
// }
// var pair = f(17);
// console.log(pair[0] === 42);
// console.log(pair[1] === 17);



// function fun() { return this; }
// console.log(fun() === undefined);
// console.log(fun.call(2) === 2); //why
// console.log(fun.apply(null) === null); //why
// console.log(fun.call(undefined) === undefined); //why
// console.log(fun.bind(true)() === true); //why

// let a = 10;
// console.log(a);
// let b = Object.create(new Number(a));
// console.log(typeof b);

// let a = ["abc"];
// a['x'] = 1;
// a['y'] = "hello";
// a["calculate"] = function() {
//     return 2 ** this.x;
// };
// for (let i of a) {
//     console.log(i);
// }
// for (let i in a) {
//     console.log(i);
// }
// console.log("completed");


// let a = {
//     1: "abc",
//     x: 1,
//     y: "Hello",
//     calculate: function() {
//         return 2 ** this.x;
//     },
//     get getX() { return this.x },
//     set setX(x) {
//         this.x = x;
//     },
//     "prop1": undefined
// }
// console.log(a.calculate());
// console.log(a.getX);
// a.setX = 10;
// console.log(a.calculate());
// console.log(a.getX);

// for (let i in a) {
//     console.log(a[i]);
// }

// let a = {
//     1: "abc",
//     x: 1,
//     y: "Hello",
//     calculate: function() {
//         return 2 ** this.x;
//     },
//     get getX() { return this.x },
//     set setX(x) {
//         this.x = x;
//     },
// }

// let b = Object.create(a);
// console.log(b.getX);
// b.setX = 10;
// console.log(b.getX);
// console.log(a.getX);

// let a = [1, 0, true, false, null, undefined];
// let b = [1, 0, true, false, null, undefined];
// let c = 2;
// for (let i of a) {
//     for (let j of b) {
//         console.log("&& : " + (i && j && c), "   *****  || : " + (i || j || c));

//     }
// }

// try {
//     try {
//         console.log(1);
//         throw Error("Error1");
//         console.log(2);
//     } catch {
//         console.log(2);
//         throw Error("Error2")
//     } finally {
//         console.log(3);
//         throw Error("Error3");
//         console.log(4);
//     }
// } catch (e) {
//     console.log(5);
//     console.log(e);
// }

// let a = { x: 1 };
// let b = { x: 2, y: 3 };
// let c = { y: 4, z: 5, "prop1": undefined };
// console.log(Object.assign(a, b, c));


// let a = 1;
// let b = "a";
// let c = { a, b };
// console.log(c.a + c.b);
// console.log(+c.b);


// let var1 = "v1";
// let var2 = null;
// let var3 = undefined
// let c = {
//     [var1]: 1,
//     [var2]: 2,
//     [var3]: 4
// };
// console.log(c.v1 + c[null]);
// console.log(c[null] + c[undefined]);


// let a = Object.create({ x: 1 });
// let b = {...a };
// console.log(b.x);


//Arrays

// console.log([, , ].length);

// let a = [1, null, undefined, -0];
// for (let i of a)
//     console.log(i);

// let a = [, , ];
// let b = [...a];
// console.log(b);
// for (let i of b) console.log(i);

// let a = [...
//     "       "
// ];
// let b = [...new Set(a)];
// console.log(b);


// let a = 010;
// console.log(a);

// function do5(x) {
//     console.log(x);
// }
// do5('use strict');


//error in strict mode
// delete Object.prototype;



// let o = { value: "Hello" };
// let a = Object.create(o);
// a.getLength = function() {
//     let cnt = 0;
//     for (let i in a.value) {
//         cnt++;
//     }
//     return cnt;
// };
// a["newValue"] = "Hello1";

// Object.getObjSize = function(Obj) {
//     let cnt = 0;
//     for (let i in Obj) {
//         if (Obj.hasOwnProperty(i)) cnt++;
//     }
//     return cnt;
// };

// console.log(Object.getObjSize(a));