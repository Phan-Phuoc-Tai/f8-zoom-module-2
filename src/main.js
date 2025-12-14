//File chính

import "./assets/styles.css";
import app from "./app";
import initRouter from "../route/router";
const render = async function () {
  document.querySelector("#app").innerHTML = await app();
};

await render();
await initRouter();

const container = document.querySelector(".content-container div");
const sections = container.querySelectorAll("section");
const ul = sections[1].querySelector("ul");
ul.className = "flex flex-col max-w-[33.33%] gap-3 pb-14";
