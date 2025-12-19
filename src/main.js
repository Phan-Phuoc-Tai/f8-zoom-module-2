//File chính

import "./assets/styles.css";
import app from "./app";
import initRouter from "../route/router";

const root = document.querySelector("#app");
const render = async function () {
  root.innerHTML = await app();
};

await render();
await initRouter();
