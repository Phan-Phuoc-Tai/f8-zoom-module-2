import { eventApp } from "./application";
import { format } from "./format";
import httpRequest from "./httpRequest";

export const track = {
  _type: "/songs/details/",
  init() {
    this.playTrack();
  },
  autoPlay(trackInfo) {
    const tracksEl = document.querySelector(".js-tracks");
    const trackList = tracksEl.querySelectorAll("li a");
    const footerEl = document.querySelector(".js-footer");
    const playerEl = footerEl.querySelector(".player");

    const firstTrack = trackList[0];
    firstTrack.classList.add("bg-white/20", "active");
    this.handleAudio(playerEl, trackInfo);
  },

  async getTrackData(url) {
    const response = await httpRequest.get(url);
    return response.data;
  },

  playTrack() {
    const tracksEl = document.querySelector(".js-tracks");
    const trackList = tracksEl.querySelectorAll("li a");
    const footerEl = document.querySelector(".js-footer");
    const playerEl = footerEl.querySelector(".player");
    const trackInfoEl = document.querySelector(".js-track-info");
    trackList.forEach((track) => {
      track.addEventListener("click", async (e) => {
        e.stopPropagation();
        eventApp.showLoading();
        const activeTrack = tracksEl.querySelector(".active");
        const url = `${this._type}${track.dataset.trackId}`;
        const trackInfo = await this.getTrackData(url);
        this.handleAudio(playerEl, trackInfo);
        this.showTrackInfo(trackInfoEl, trackInfo);
        track.classList.add("bg-white/20", "active");
        activeTrack.classList.remove("bg-white/20", "active");
        eventApp.removeLoading();
      });
    });
  },

  handleAudio(playerEl, trackInfo) {
    const progress = document.querySelector(".progress");
    const audio = document.querySelector("audio");
    audio.src = trackInfo.audioUrl;
    audio.preload = "metadata";
    progress.style.width = 0;
    audio.addEventListener("loadedmetadata", (e) => {
      const leftPlayer = playerEl.querySelector(".left-player");
      const playerTimer = leftPlayer.querySelector(".player-timer");
      const playerControl = leftPlayer.querySelector(".player-control");
      const playBtn = playerControl.querySelector(".play-btn i");

      this.showTrackDetail(playerEl, trackInfo, audio.duration);
      audio.volume = 0.1;
      audio.play();
      audio.addEventListener("play", () => {
        playBtn.classList.replace("fa-play", "fa-pause");
      });
      audio.addEventListener("pause", () => {
        playBtn.classList.replace("fa-pause", "fa-play");
      });

      audio.addEventListener("timeupdate", (e) => {
        let currentTimeEl = playerTimer.firstElementChild;
        currentTimeEl.innerText = format.timeTrack(audio.currentTime);
        let rate = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${rate}%`;
      });

      playBtn.onclick = (e) => {
        e.stopPropagation();
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      };
      this.handleProgress(audio, audio.duration);
    });
  },

  handleProgress(audioEl, duration) {
    const footerEl = document.querySelector(".js-footer");
    const progressBar = document.querySelector(".progress-bar");
    const progress = document.querySelector(".progress");
    const progressSpan = progress.querySelector("span");
    //Lấy độ dài của progressBar
    const progressBarClientWidth = progressBar.clientWidth;
    let offsetX = 0;

    progressBar.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      offsetX = e.offsetX;
      let rate = (offsetX / progressBarClientWidth) * 100;

      progress.style.width = `${rate}%`;
      if (audioEl && duration) {
        let currentTime = (rate * duration) / 100;

        audioEl.currentTime = currentTime;
      }
      document.addEventListener("mousemove", handleDrag);
    });

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleDrag);
      footerEl.classList.remove("select-none");
      footerEl.classList.remove("cursor-pointer");
    });

    progressBar.addEventListener("mouseup", (e) => {
      audioEl.play();
    });

    progressSpan.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      document.addEventListener("mousemove", handleDrag);
      footerEl.classList.add("select-none");
    });

    progressSpan.addEventListener("mousemove", (e) => {
      e.stopPropagation();
    });

    function handleDrag(e) {
      let clientX = e.clientX;
      let rate = (clientX / progressBarClientWidth) * 100;
      progress.style.width = `${rate}%`;
      footerEl.classList.add("cursor-pointer");
      if (audioEl && duration) {
        let currentTime = (rate * duration) / 100;
        audioEl.currentTime = currentTime;
        audioEl.pause();
      }
    }
  },

  showTrackDetail(playerEl, trackInfo, duration) {
    const thumb = playerEl.querySelector(".middle-player img");
    const title = playerEl.querySelector(".middle-player h3");
    const playerTimer = playerEl.querySelector(".player-timer");
    const durationEl = playerTimer.lastElementChild;

    durationEl.innerText = format.timeTrack(duration);
    thumb.src = trackInfo.thumbnails;
    title.innerText = trackInfo.title;
  },

  showTrackInfo(trackInfoEl, trackInfo) {
    const trackThumb = trackInfoEl.querySelector("img");
    const trackTitle = trackInfoEl.querySelector("h2");
    const time = trackInfoEl.querySelector("p").lastElementChild;
    trackThumb.src = trackInfo.thumbnails;
    trackTitle.innerText = trackInfo.title;
    time.innerText = format.timeTrack(trackInfo.duration);
  },
};
