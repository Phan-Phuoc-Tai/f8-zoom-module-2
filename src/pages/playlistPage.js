function playlistPage() {
  return `
  <div class="grid grid-cols-2 grid-rows-1">
    <div class="grid-cols-1">
      ${infoDetail}
    </div>
    <div class="grid-cols-1">
      ${trackList}
    </div>
  </div>
  `;
}

export default playlistPage;
