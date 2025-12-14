import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { SideBar } from "./components/sideBar";

export default async function app() {
  return `
    ${await Header()}
    ${await SideBar()}
    <main class='js-body'>
    </main>
    ${await Footer()}
  `;
}
