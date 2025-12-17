//File chính

import "./assets/styles.css";
import app from "./app";
import initRouter from "../route/router";
import { eventApp } from "./tools/application";

const root = document.querySelector("#app");
const render = async function () {
  root.innerHTML = await app();
};

await render();
await initRouter();
