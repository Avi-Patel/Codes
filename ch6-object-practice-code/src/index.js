import "./styles.css";

document.getElementById("app").innerHTML = ``;
// (1)
// let o = { value: "Hello" };
// let a = Object.create(o);
// a.getLength = function () {
//   let cnt = 0;
//   for (let i in a.value) {
//     cnt++;
//   }
//   return cnt;
// };
// a["newValue"] = "Hello1";

// console.log(a.getLength());
// for (let i in a) {
//   console.log(i);
// }

// let cnt = 0;
// console.log(Object.keys(a));
// for (let i of Object.keys(a)) {
//   console.log(i);
//   cnt++;
// }

// console.log(cnt);
// for (let i of Object.getOwnPropertyNames(a)) {
//   console.log(i);
// }

//(2);
// let o = { value: "Hello" };
// let a = Object.create(o);
// a.getLength = function () {
//   let cnt = 0;
//   for (let i in a.value) {
//     cnt++;
//   }
//   return cnt;
// };
// a["newValue"] = "Hello1";

// Object.getObjSize = function (Obj) {
//   let cnt = 0;
//   for (let i in Obj) {
//     if (Obj.hasOwnProperty(i)) cnt++;
//   }
//   return cnt;
// };

// console.log(Object.getObjSize(a));

//(3)
// var library = [
//   {
//     author: "Bill Gates",
//     title: "The Road Ahead",
//     readingStatus: true
//   },
//   {
//     author: "Steve Jobs",
//     title: "Walter Isaacson",
//     readingStatus: true
//   },
//   {
//     author: "Suzanne Collins",
//     title: "Mockingjay: The Final Book of The Hunger Games",
//     readingStatus: false
//   }
// ];
// for (let book of library) {
//   console.log(book.readingStatus);
// }

//(4)
// function getAllFunctions(obj) {
//   let result = [];
//   for (let i of Object.getOwnPropertyNames(obj)) {
//     if (typeof obj[i] === "function") {
//       result.push(i);
//     }
//   }
//   return result;
// }

// console.log(getAllFunctions(Math));
// console.log(getAllFunctions(Date.prototype));
// console.log(getAllFunctions(Object));
// console.log(getAllFunctions(Object.prototype));

// console.log(Object.prototype.hasOwnProperty("constructor"));

// let o = new String("sbjkbwd");
// console.log(o.valueOf());
// console.log(o.toUpperCase());

// o.GetAlternative = function () {
//   let i = 0;
//   let result = "";
//   for (let char of this.toString()) {
//     if (i % 2 === 0) {
//       result += char.toLowerCase();
//     } else {
//       result += char.toUpperCase();
//     }
//     i++;
//   }
//   return result;
// };

// console.log(o.GetAlternative());

// let Org = { name: "Abcd Organisation" };
// Object.defineProperty(Org, "getOrgName", {
//   get: function () {
//     return this["name"];
//   }
// });

// Object.defineProperty(Org, "setOrgName", {
//   set: function (name) {
//     this["name"] = name;
//   }
// });

// let customerBalance = Object.create(Org);
// let names = [
//   "asnd",
//   "qdjkq",
//   "nqkdnq",
//   "qwnq",
//   "qdnlwqd",
//   "wqdnlwqndq",
//   "qdnwq",
//   "dmqw",
//   "dnkqdq",
//   "iekqw"
// ];
// let balances = [614, 123, 1813, null, , 38271, 2137, "dkqnd", 23178, 12381];
// for (let i in names) {
//   if (Number.isInteger(balances[i])) {
//     customerBalance[names[i]] = balances[i];
//   }
// }
// console.log(customerBalance);

// let book = { subtitle: "Anjkdq" };
// console.log(book.subtitle.length);
// // console.log(book.author.length);  // error
// function check(book) {
//   return book
//     ? book.author
//       ? book.autho.length
//       : "author not defined"
//     : "book does not exist";
// }
// console.log(check(book));
// console.log(book?.author?.length);
// console.log(book && book.author && book.author.lenght);

// customerBalance.deleteCusto = function (cname) {
//   if (this.hasOwnProperty(cname)) {
//     delete this[cname];
//   }
// };

// customerBalance.addCusto = function (cname, balance) {
//   if (cname !== null && cname !== undefined) {
//     if (Number.isInteger(balance)) {
//       this[cname] = balance;
//     }
//   }
// };

// customerBalance.deleteCusto("asnd");
// console.log(customerBalance);
// customerBalance.addCusto("Avi", 342);

// console.log("abcd" in customerBalance);
// customerBalance["abcd"] = undefined;
// console.log("abcd" in customerBalance);
// console.log(customerBalance["abcd"] !== undefined);

// for (let prop in customerBalance) {
//   console.log(prop, customerBalance.propertyIsEnumerable(prop));
// }

// Object.defineProperty(customerBalance, "xyzw", {
//   value: 12324,
//   enumerable: false
// });
// Object.defineProperty(customerBalance, Symbol("new").valueOf(), {
//   value: 123134,
//   enumerable: false
// });

// console.log(Object.getOwnPropertyNames(customerBalance));
// console.log(Object.keys(customerBalance));
// console.log(Object.getOwnPropertySymbols(customerBalance));
// console.log(Reflect.ownKeys(customerBalance));

// let CBStirng = JSON.stringify(customerBalance); // Enumerable own properties
// console.log(CBStirng);
// console.log(JSON.parse(CBStirng));

// //default toString method
// console.log(customerBalance.toString());

// //defining own toString method
// customerBalance.toString = function () {
//   let result = "";
//   for (let prop of Object.getOwnPropertyNames(this)) {
//     // console.log(prop);
//     if (prop !== "toString") result += " " + prop + "  " + this[prop] + " \n";
//   }
//   return result;
// };
// console.log(customerBalance.toString());

// let d1 = new Date();
// console.log(JSON.stringify(d1));
// console.log(d1.toJSON());
// console.log(d1.toLocaleString());
// console.log(d1.toString());

// // #miliseconds
// console.log(d1.valueOf());
// let d2 = new Date();
// console.log(d2.valueOf());
// console.log(d1 - 10 < d2);
// console.log(d1.valueOf() === d2.valueOf());

//will give error
// console.log(customerBalance.toJSON());

// function generateName() {
//   return new Date().valueOf().toString();
// }
// function generateBalance() {
//   return Math.floor(Math.random() * 1000);
// }

// customerBalance.addCusto(generateName(), generateBalance());
// console.log(customerBalance);

// let custoSet1 = {
//   [generateName() + 1]: generateBalance(),
//   [generateName() + 2]: generateBalance()
// };

// let custoSet2 = {
//   [generateName() + 3]: generateBalance(),
//   [generateName() + 4]: generateBalance()
// };

// customerBalance = { ...customerBalance, ...custoSet1, ...custoSet2 };
// console.log(customerBalance);

// Object.defineProperty(Org, "getOrgName", {
//   get: function () {
//     return this["name"];
//   }
// });

// Object.defineProperty(Org, "setOrgName", {
//   set: function (name) {
//     this["name"] = name;
//   }
// });

// console.log(customerBalance.name);
// customerBalance.name = "pqr Organisation";

// console.log(customerBalance.getOrgName);
// customerBalance.setOrgName = "xyz Organisation";
// console.log(customerBalance.getOrgName);

let s = "avi";
s.toUpperCase();
console.log(s);
