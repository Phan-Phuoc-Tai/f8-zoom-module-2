//File chính

import "./assets/styles.css";
import app from "./app";
import initRouter from "../route/router";
import { auth } from "./tools/authentication";

const root = document.querySelector("#app");
const render = async function () {
  root.innerHTML = await app();
  auth.init();
};

await render();
await initRouter();
