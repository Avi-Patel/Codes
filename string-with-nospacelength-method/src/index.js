import "./styles.css";

document.getElementById("app").innerHTML = ``;

let o = {
  value: "",
  noSpaceLength: function () {
    let l = 0;
    for (let i in this.value) {
      if (i !== " ") {
        l++;
      }
    }
    return l;
  }
};

function getMyStirng(input) {
  let newString = Object.create(o);
  newString.value = input;
  return newString;
}

let s1 = getMyStirng("Avi Patel");
console.log(s1.noSpaceLength());
s1.value = "ndkd    kdbnw";
console.log(s1.noSpaceLength());
