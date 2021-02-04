const createElement = (tagName, attribute, textContent, parent) => {
  const element = document.createElement(tagName);
  element.textContent = textContent;
  for (let attr in attribute) {
    element.style[attr] = attribute[attr];
  }
  return element;
};
let count = 0;
const counter = createElement("p", {}, "0");
const button1 = createElement("button", { backgroundColor: "red" }, "btn1");
const button2 = createElement("button", {}, "btn2");

const body = document.querySelector("body");
body.appendChild(counter);
body.appendChild(button1);
body.appendChild(button2);

const incrementCounter = (event) => {
  const counterNode = document.querySelector("p");
  count++;
  count > 10 ? counterNode.remove() : (counterNode.textContent = `${count}`);
};

button1.addEventListener("click", incrementCounter);

button2.addEventListener("click", incrementCounter);

// const main1 = document.querySelector("#main1");
// const main = document.querySelector("#main");
// main.addEventListener("click", (event) => {
//   console.log(event);
//   let i = 0;
//   while (i < event.path.length - 3) {
//     const textContent = event.path[i].innerText;
//     console.log(textContent);
//     if (event.path[i].getAttribute("id") === textContent) break;
//     i++;
//   }
//   if (i < event.path.length - 3) {
//     main1.textContent = event.path[i].textContent;
//   }
// });
