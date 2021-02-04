// function replaceImages() {
//   let images = document.body.getElementsByTagName("img");
//   let images1 = Array.from(images);
//   for (let i = 0; i <= images1.length; i++) {
//     let image = images1[i];
//     if (image.src) {
//       console.log(image.src);
//       let text = document.createTextNode(image.src);
//       image.parentNode.replaceChild(text, image);
//     }
//   }
// }
// let paras = document.body.getElementsByTagName("p");
// let newEle = document.createElement("p");
// newEle.nodeText = "I have two feet";
// newEle.setAttribute("data-classified", "secret");
// console.log(
//   Array.prototype.indexOf.call(
//     Array.from(paras).map((Element) => {
//       console.log(Element.getAttribute("data-classified"));
//       return Element.getAttribute("data-classified");
//     }),
//     "secret"
//   )
// );
// for (let para of Array.from(paras)) {
//   if (para.getAttribute("data-classified") == "secret") {
//     para.remove();
//   }
// }

/*************************************/

// function count(selector) {
//   const List = document.querySelectorAll(selector);
//   console.log(List instanceof Array, typeof List);
//   return List.length;
// }
// console.log(count("p")); // All <p> elements
// // → 4
// console.log(count(".animal")); // Class animal
// // → 2
// console.log(count("p .animal")); // Animal inside of <p>
// // → 2
// console.log(count("p > .animal")); // Direct child of <p>

// console.log(document.querySelector("img").style);

/*************************************/

// const MOUNTAINS = [
//   { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
//   { name: "Everest", height: 8848, place: "Nepal" },
//   { name: "Mount Fuji", height: 3776, place: "Japan" },
//   { name: "Vaalserberg", height: 323, place: "Netherlands" },
//   { name: "Denali", height: 6168, place: "United States" },
//   { name: "Popocatepetl", height: 5465, place: "Mexico" },
//   { name: "Mont Blanc", height: 4808, place: "Italy/France" }
// ];

// function addTable(data) {
//   let table = document.createElement("table");
//   table.style.border = "2px solid black";
//   table.style.padding = "0px";
//   let row = document.createElement("tr");
//   for (let i in data[0]) {
//     let cell = document.createElement("th");
//     cell.style.border = "1px solid gray";
//     cell.style.margin = "0px";
//     cell.innerText = i;
//     row.appendChild(cell);
//   }
//   table.appendChild(row);
//   for (let i in data) {
//     row = document.createElement("tr");
//     for (let j in data[i]) {
//       let cell = document.createElement("td");
//       cell.style.border = "1px solid gray";
//       cell.style.margin = "0px";
//       cell.innerText = data[i][j];
//       row.appendChild(cell);
//     }
//     table.appendChild(row);
//   }
//   let div1 = document.querySelector("#mountains");
//   div1.appendChild(table);
// }
// addTable(MOUNTAINS);

/*************************************/

// let b = document.querySelector("p");
// b.style.fontSize = "50px";
// function handle(event) {
//   let fsize = b.style.fontSize;
//   console.log(fsize);
//   if (event.key === "ArrowUp") {
//     if (parseFloat(fsize) > 80) {
//       b.textContent = "Boom!!";
//       b.style.fontSize = "20px";
//       window.removeEventListener("keydown", handle);
//     } else {
//       b.style.fontSize = parseFloat(fsize) * 1.1 + "px";
//     }
//   } else if (event.key === "ArrowDown") {
//     b.style.fontSize = parseFloat(fsize) * 0.9 + "px";
//   }
// }
// window.addEventListener("keydown", handle);

/*************************************/

// let counter = 0;
// let mouseco = [null, null];
// for (let i = 0; i < 10; i++) {
//   let trail = document.createElement("div");
//   trail.style.position = "absolute";
//   trail.style.height = "12px";
//   trail.style.width = "12px";
//   trail.style.borderRadius = "3px";
//   trail.style.top = "6px";
//   trail.style.left = "6px";
//   trail.style.backgroundColor = "black";
//   document.body.appendChild(trail);
// }
// // console.log(coordinate);
// let mise = document.body.querySelectorAll("div");
// window.addEventListener("mousedown", (event) => {
//   mouseco[0] = event.clientX;
//   mouseco[1] = event.clientY;
//   console.log(mouseco);
//   window.addEventListener("mousemove", move);
//   event.preventDefault();
//   counter++;
//   counter %= 10;
// });
// function move(event) {
//   if (event.buttons === 0) {
//     window.removeEventListener("mousemove", move);
//   } else {
//     let newCox = event.clientX,
//       newCoy = event.clientY;
//     console.log(newCox, newCoy);
//     mise[counter].style.left =
//       parseFloat(mise[counter].style.left) + newCox - mouseco[0] + "px";
//     mise[counter].style.top =
//       parseFloat(mise[counter].style.top) + newCoy - mouseco[1] + "px";
//     mouseco[0] = newCox;
//     mouseco[1] = newCoy;
//   }
// }

/*************************************/

// function asTabs(node) {
//   console.log(node.children.length);
//   let tabDiv = document.createElement("div");
//   let tabList = Array.from(node.children).map((nodei, i) => {
//     let button = document.createElement("button");
//     button.textContent = nodei.getAttribute("data-tabname");
//     let tab = [nodei, button];
//     button.addEventListener("click", () => selectTab(tab));
//     return tab;
//   });
//   for (let tab of tabList) tabDiv.appendChild(tab[1]);
//   node.insertBefore(tabDiv, node.firstChild);
//   function selectTab(seTab) {
//     for (let tab of tabList) {
//       let isSelected = tab === seTab;
//       tab[0].style.display = isSelected ? "" : "none";
//       tab[1].style.color = isSelected ? "red" : "";
//     }
//   }
// }
// asTabs(document.querySelector("tab-panel"));

/*************************************/

// console.log("Starting");
// let image;
// async function fetch() {
//   return "2nd step";
// }
// fetch()
//   .then((response) => {
//     console.log(response);
//     return "next then";
//   })
//   .then((myBlob) => {
//     console.log(myBlob);
//   })
//   .catch((error) => {
//     console.log(
//       "There has been a problem with your fetch operation: " + error.message
//     );
//   });
// console.log("All done!");

/*************************************/

// setTimeout(function () {
//   console.log("World");
// }, 0);
// console.log("Hello");

/*************************************/

// let p = document.body.querySelector("p");
// p.style.position = "relative";
// p.style.top = "0px";
// function move() {
//   // console.log(parseFloat(p.style.top));
//   p.style.top = parseFloat(p.style.top) + 5 + "px";
//   if (parseFloat(p.style.top) >= 400) {
//     p.style.top = "0px";
//   }
//   requestAnimationFrame(move);
// }
// move();

/*************************************/

// function move() {
//   // console.log(parseFloat(p.style.top));
//   p.style.top = parseFloat(p.style.top) + 5 + "px";
//   if (parseFloat(p.style.top) >= 400) {
//     p.style.top = "0px";
//   }
// }
// setInterval(move, 17);

/*************************************/

// function fetchAndDecode(url, type) {
//   // Returning the top level promise, so the result of the entire chain is returned out of the function
//   return fetch(url).then((response) => {
//     // Depending on what type of file is being fetched, use the relevant function to decode its contents
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     } else {
//       if (type === "blob") {
//         return response.blob();
//       } else if (type === "text") {
//         return response.text();
//       }
//     }
//   });
//   // .catch((e) => {
//   //   console.log(
//   //     `There has been a problem with your fetch operation for resource "${url}": ` +
//   //       e.message
//   //   );
//   // })
// }

// // Call the fetchAndDecode() method to fetch the images and the text, and store their promises in variables
// let coffee = fetchAndDecode("images/pic1.jpg", "blob");
// let tea = fetchAndDecode("images/pic2.jpg", "blob");
// let description = fetchAndDecode("images/dummy.txt", "text");

// // Use Promise.all() to run code only when all three function calls have resolved
// Promise.all([coffee, tea, description])
//   .then((values) => {
//     // console.log(values);
//     // Store each value returned from the promises in separate variables; create object URLs from the blobs
//     let objectURL1 = URL.createObjectURL(values[0]);
//     let objectURL2 = URL.createObjectURL(values[1]);
//     let descText = values[2];

//     // Display the images in <img> elements
//     let image1 = document.createElement("img");
//     let image2 = document.createElement("img");
//     image1.src = objectURL1;
//     image2.src = objectURL2;
//     document.body.appendChild(image1);
//     document.body.appendChild(image2);

//     // Display the text in a paragraph
//     let para = document.createElement("p");
//     para.textContent = descText;
//     document.body.appendChild(para);
//   })
//   .catch((e) => {
//     console.log("Error occured");
//   });

/*************************************/

// console.log("1");
// async function func2() {
//   for (let i = 0; i < 1000; i += 2) {
//     i--;
//   }
// }
// async function func() {
//   await func2();
//   console.log("3");
// }
// func();
// console.log("2");

/*************************************/

// function timeoutPromise(interval) {
//   return new Promise((resolve, reject) => {
//     setTimeout(function () {
//       resolve("done");
//     }, interval);
//   });
// }
// async function timeTest() {
//   const timeoutPromise1 = timeoutPromise(3000);
//   const timeoutPromise2 = timeoutPromise(3000);
//   const timeoutPromise3 = timeoutPromise(3000);

//   await timeoutPromise1;
//   await timeoutPromise2;
//   await timeoutPromise3;
// }
// let startTime = Date.now();
// timeTest().then(() => {
//   let finishTime = Date.now();
//   let timeTaken = finishTime - startTime;
//   alert("Time taken in milliseconds: " + timeTaken);
// });
