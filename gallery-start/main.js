const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */

for (let i = 1; i <= 30; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `/images/pic${i%5+1}.jpg`);
    thumbBar.appendChild(newImage);
}

thumbBar.addEventListener("click", event => {
    displayedImage.setAttribute("src", event.target.getAttribute("src"));
});

/* Wiring up the Darken/Lighten button */

btn.addEventListener("click", (event) => {
    if (event.target.textContent === "Darken") {
        event.target.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else {
        event.target.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
});