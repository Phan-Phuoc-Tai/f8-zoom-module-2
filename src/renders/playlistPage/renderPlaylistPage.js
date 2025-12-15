import getList from "../../tools/getList";

async function getTrack() {
  const tracks = await getList("/playlists/details/party-hits");
}

function renderPlaylistPage() {}

export default renderPlaylistPage;
