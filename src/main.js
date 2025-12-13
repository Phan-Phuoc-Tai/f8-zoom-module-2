//File chính

import "./assets/styles.css";
import { Header } from "./components/header";
import { NavBar } from "./components/navBar";
import { ContentContainer } from "./components/contentContainer";
import { Footer } from "./components/footer";

const app = document.querySelector("#app");
app.innerHTML = `${Header()}${NavBar()}${ContentContainer()}${Footer()}`;
