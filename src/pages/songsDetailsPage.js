import templateDetails from "../components/templateDetails";
import templateExpand from "../components/templateExpand";
import { eventApp } from "../tools/application";

export default async function songsDetailsPage(playListInfos, tracks) {
  return `<div class="content-container">
      <div class="p-2">
        ${templateDetails(playListInfos, tracks, true)}
        ${eventApp.removeLoading()}
        
      </div>
    </div>
    <div class="playlist-expand fixed inset-0 bg-[#121212] text-white z-500 flex-col bg-linear-to-b from-[#0f1417] via-[#0c1f21] to-[#0a0f10] open hidden">
      <div class="w-full flex justify-center py-2 mb-12">
        <div class="w-12 h-1.5 bg-gray-500 rounded-full"></div>
      </div>

      <div class="flex-1 px-5">
        ${templateExpand(playListInfos, tracks, true)}
      </div>
    </div>
    `;
}
