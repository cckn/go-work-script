import "./app.css";
import { sum } from "./math.js";

const result = sum(1, 3);

document.querySelector("#app").innerHTML = result;
console.log(result);
