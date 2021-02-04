/* CHALLENGE 1 */

function sayHowdy() {
  console.log("Howdy");
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log("Partnah");
}
// After thinking it through, uncomment the following line to check your guess!
// testMe(); // what order should these log out? Howdy or Partnah first?

/* CHALLENGE 2 */

function delayedGreet() {
  // ADD CODE HERE
  setTimeout(() => {
    console.log("welcome");
  }, 3000);
}
// Uncomment the following line to check your work!
// delayedGreet(); // should log (after 3 seconds): welcome

/* CHALLENGE 3 */

function helloGoodbye() {
  // ADD CODE HERE
  console.log("hello");
  setTimeout(() => {
    console.log("goodbye");
  }, 2000);
}
// Uncomment the following line to check your work!
// helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye

/* CHALLENGE 4 */

function brokenRecord() {
  // ADD CODE HERE
  setInterval(() => {
    console.log("hi again");
  }, 1000);
}
// Uncomment the following line to check your work!
// brokenRecord(); // should log (every second): hi again

/* CHALLENGE 5 */

function limitedRepeat() {
  // ADD CODE HERE
  const interval = setInterval(() => {
    console.log("hi for now");
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
  }, 5000);
}
// Uncomment the following line to check your work!
// limitedRepeat(); // should log (every second, for 5 seconds): hi for now

/* CHALLENGE 6 */

// Uncomment the following lines to check your work!
function theEnd() {
  console.log("This is the end!");
}
function everyXsecsForYsecs(theEnd, interval, duration) {
  const interval1 = setInterval(() => {
    console.log("hi for now");
  }, interval * 1000);
  setTimeout(() => {
    clearInterval(interval1);
  }, duration * 1000);
} // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!
// everyXsecsForYsecs(theEnd, 2, 10);

/* CHALLENGE 7 */

function delayCounter(target, wait) {
  return () => {
    let counter = 1;
    const interval = setInterval(() => {
      console.log(counter);
      counter++;
      if (counter > target) clearInterval(interval);
    }, wait);
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const countLogger = delayCounter(10, 1000);
// countLogger();
// After 1 second, log 1
// After 2 seconds, log 2
// After 3 seconds, log 3

/* CHALLENGE 8 */

function promised(val) {
  // ADD CODE HERE
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val);
    }, 2000);
  });
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const createPromise = promised('wait for it...');
// createPromise.then((val) => console.log(val));
// will log "wait for it..." to the console after 2 seconds

/* CHALLENGE 9 */

class SecondClock {
  constructor(cb) {
    // ADD CODE HERE
    this.cb = cb;
    this.counter = 0;
  }
  // ADD METHODS HERE
  start() {
    this.interval = setInterval(() => {
      this.counter++;
      this.cb(this.counter);
      this.counter %= 60;
    }, 1000);
  }
  reset() {
    clearInterval(this.interval);
    this.counter = 0;
  }
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const clock = new SecondClock((val) => { console.log(val) });
// console.log("Started Clock.");
// clock.start();
// setTimeout(() => {
//     clock.reset();
//     console.log("Stopped Clock after 6 seconds.");
// }, 6000);

/* CHALLENGE 10 */

function debounce(callback, interval) {
  // ADD CODE HERE
  let time = 0;
  return () => {
    const newTime = new Date().getTime();
    if (newTime - time < interval) {
      time = newTime;
      return;
    } else {
      time = newTime;
      return callback();
    }
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
function giveHi() {
  return "hi";
}
const giveHiSometimes = debounce(giveHi, 3000);
console.log(giveHiSometimes()); // -> 'hi'
setTimeout(function () {
  console.log(giveHiSometimes());
}, 2000); // -> undefined
setTimeout(function () {
  console.log(giveHiSometimes());
}, 4000); // -> undefined
setTimeout(function () {
  console.log(giveHiSometimes());
}, 8000);
