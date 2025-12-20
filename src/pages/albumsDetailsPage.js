import templateDetails from "../components/templateDetails";
import { eventApp } from "../tools/application";

async function albumsDetailsPage(albumsInfos, tracks) {
  return `<div class="content-container">
      <div class="p-2">
        ${templateDetails(albumsInfos, tracks, false, false)}
        ${eventApp.removeLoading()}

      </div>
    </div>
    `;
}

export default albumsDetailsPage;
