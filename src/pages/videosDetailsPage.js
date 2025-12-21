import templateVideoDetails from "../components/templateVideos";
import { eventApp } from "../tools/application";

export default async function videosDetailsPage(videoInfo, videos) {
  return `<div class="content-container">
      <div class="p-2">
        ${templateVideoDetails(videoInfo, videos)}
        ${eventApp.removeLoading()}
        
      </div>
    </div>
    `;
}
