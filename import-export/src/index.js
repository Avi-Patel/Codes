import "./styles.css";
import myfun, * as Module1 from "./exportModule.js";
document.getElementById("app").innerHTML = `
`;

console.log(Module1.var1);
console.log(Module1.obj1);
console.log(myfun(2));
