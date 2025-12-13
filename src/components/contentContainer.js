import { Moods } from "./moods";
import { Album } from "./album";
import { QuickPicks } from "./quickPicks";

export const ContentContainer = () => {
  return `
  <main class="contentContainer">
        <div class="p-2">
          ${Moods()}
          ${QuickPicks()}
          ${Album()}
          ${Album()}
          ${Album()}
        </div>
  </main>
  `;
};
