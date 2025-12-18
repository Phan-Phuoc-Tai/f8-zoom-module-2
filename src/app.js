import header from "./components/header";
import { sideBar } from "./components/sideBar";
import { footer } from "./components/footer";

export default async function app() {
  return `
    ${header()}
    ${sideBar()}
    <main class='js-body'>
    </main>
    <div class='toast'></div>
    <div class='js-loading'></div>
    ${footer()}
    <audio></audio>
  `;
}
