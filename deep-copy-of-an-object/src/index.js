import "./styles.css";

document.getElementById("app").innerHTML = ``;

function objToArray(input) {
  let result = [];
  for (let i in input) {
    result.push(input[i]);
  }
  return result;
}

function deepCopy(input) {
  // console.log(input, typeof input);

  //if input is not of type Object
  if (typeof input !== "object") return input;

  //if input is type of Set(object)
  if (input instanceof Set) {
    let result = new Set();
    input.forEach((ele) => {
      if (typeof ele !== "object") {
        result.add(ele);
      } else {
        result.add(deepCopy(ele));
      }
    });
    return result;
  }

  //if input is type of Map(object)
  if (input instanceof Map) {
    let result = new Map();
    for (let [x, y] of input) {
      if (typeof y === "object") {
        result.set(x, deepCopy(y));
      } else {
        result.set(x, y);
      }
    }
    return result;
  }

  // if input if of type object other than Set and Map (Object or Array)
  let result = {};
  for (let i in input) {
    if (typeof input[i] === "object") {
      let temp = deepCopy(input[i]);
      if (input[i] instanceof Array) {
        temp = objToArray(temp);
      }

      result[i] = temp;
    } else {
      result[i] = input[i];
    }
  }
  if (typeof input === "object") {
    if (input instanceof Array) {
      result = objToArray(result);
    }
    return result;
  } else {
    return input;
  }
}
let a = {
  x: [1, new Set(["x", "y"]), 3, { x: 1, y: 2 }],
  y: {
    z: 2,
    w: {
      ab: 3
    }
  }
};
a.z = new Set();
a.z.add(1);
a.z.add({ x: 1, y: 2 });

a["ab"] = new Map();
a["ab"].set("a", 1);
a["ab"].set("b", { x: 1, y: 2 });

let r = deepCopy(a);
console.log(a);
console.log(r);
console.log(a.y === r.y);
console.log(a.y.w === r.y.w);
console.log(a.y.w.ab === r.y.w.ab);
console.log(r.x === a.x);
console.log(a.z === r.z);
console.log(a.x[1] === r.x[1]);
console.log(a.x[3] === r.x[3]);
console.log(a["ab"].get("b") === r["ab"].get("b"));

let r1 = deepCopy(a.z);
console.log(r1 === a.z);
