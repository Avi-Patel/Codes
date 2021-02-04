const list = [
  "Walk the dog",
  "Take a run",
  "Water the garden",
  "Whisk the cream",
  "Lets go for a walk",
  "completed to do list task",
  "He turned Random back and headed for the camp.",
  "So you just made a random deal with Darkyn."
];
const searchBox = document.querySelector("#searchBox");
const throttledBox = document.querySelector("#throttledBox");
const normalBox = document.querySelector("#normalBox");
const debouncedBox = document.querySelector("#debouncedBox");

const createElement = (tagName, attribute, textContent, parent) => {
  const element = document.createElement(tagName);
  element.textContent = textContent;
  for (let attr in attribute) {
    element.style[attr] = attribute[attr];
  }
  return element;
};

//use foreach
// define object of prop here

const elementStyle = {
  width: "100%",
  margin: "8px 0px",
  padding: "4px",
  "text-align": "center"
};

list.forEach((sentence) => {
  throttledBox.appendChild(createElement("div", elementStyle, sentence));
  normalBox.appendChild(createElement("div", elementStyle, sentence));
  debouncedBox.appendChild(createElement("div", elementStyle, sentence));
});

const checkAndDisplay = (sentenceList, words) => {
  sentenceList.forEach((sentence) => {
    if (
      !words.some(
        (word) => sentence.textContent.toLowerCase().indexOf(word) + 1
      )
    ) {
      sentence.style.display = "none";
    } else {
      sentence.style.display = "";
    }
  });
};

const throttleList = (words, event) => {
  // use {}
  if (event.timeStamp - last < 1000) {
    return;
  }
  setTimeout(() => {
    last = event.timeStamp;
    const sentenceList = Array.from(throttledBox.children).slice(1);
    checkAndDisplay(sentenceList, words);
  }, 0);
};
const normalList = (words, event) => {
  const sentenceList = Array.from(normalBox.children).slice(1);
  checkAndDisplay(sentenceList, words);
};
const debounceList = (words, event) => {
  clearTimeout(timeoutId);
  const timeoutId = setTimeout(() => {
    const sentenceList = Array.from(debouncedBox.children).slice(1);
    checkAndDisplay(sentenceList, words);
  }, 1000);
};

let last = 0;
searchBox.addEventListener("input", (event) => {
  //use event.target
  const words = event.target.value.toLowerCase().trim().split(" ");
  throttleList(event, words);
  normalList(words);
  debounceList(words);
});
