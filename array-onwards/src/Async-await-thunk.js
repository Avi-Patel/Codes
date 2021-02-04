// const addAsync = (x, y, callBack) => {
//   setTimeout(() => {
//     callBack(x + y);
//   }, 2000);
// };
// const thunk = (callBack) => {
//   addAsync(10, 15, callBack);
// };

// thunk((sum) => {
//   console.log(sum);
// });

// thunk((sum) => {
//   console.log(sum);
// });

let items = [1, 2, 3, 4, 5, 6, 7, 8];

function makeResult(items) {
  let newArr = [];
  for (let i = 0; i < items.length; i++) {
    newArr.push("word_" + i);
  }
  return newArr;
}

const dowork = (result) => {
  console.log(result);
};

async function getResult() {
  let result = await makeResult(items); // Blocked on this line
  dowork(result); // Will not be executed before makeResult() is done
}

getResult().then(() => {
  console.log("completed");
});
