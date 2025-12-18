import { router } from "../../route/router";
import templateDetails from "../components/templateDetails";
import { eventApp } from "../tools/application";

export default async function songsDetailsPage(playListInfos, tracks) {
  return `<div class="content-container">
      <div class="p-2">
        ${templateDetails(playListInfos, tracks, true)}
        ${eventApp.removeLoading()}
        
      </div>
    </div>
    `;
}
