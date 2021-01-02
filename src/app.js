import "./app.css";
import nyancat from "./nyancat.jpg";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `<img src=${nyancat}></img>`;
});

console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(api.domain);
