import { eventApp } from "./application";
import { format } from "./format";
import httpRequest from "./httpRequest";

export const playSong = {
  _duration: 0,
  init() {
    this.handleProgress();
    this.getSong();
  },

  handleProgress() {
    const audio = document.querySelector("audio");
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
      let currentTime = (rate * this._duration) / 100;
      audio.currentTime = currentTime;
      document.addEventListener("mousemove", handleDrag);
    });

    document.addEventListener("mouseup", (e) => {
      document.removeEventListener("mousemove", handleDrag);
      footerEl.classList.remove("select-none");
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
    }
  },

  getSong(type = "/songs/details/") {
    const footerEl = document.querySelector(".js-footer");
    const tracksEl = document.querySelector(".js-tracks");
    const trackList = tracksEl.querySelectorAll("li a");
    const audio = document.querySelector("audio");
    trackList[0].classList.add("bg-white/20", "active");
    trackList.forEach((track) => {
      track.addEventListener("click", async (e) => {
        e.stopPropagation();
        const activeTrack = tracksEl.querySelector(".active");
        track.classList.add("bg-white/20", "active");
        if (activeTrack) {
          activeTrack.classList.remove("bg-white/20", "active");
        }

        const address = track.pathname
          ? track.pathname
          : `${type}${track.dataset.trackId}`;

        const player = footerEl.querySelector(".player");

        try {
          eventApp.showLoading();
          const data = await this.getSongData(address);

          audio.src = data.audioUrl;
          this._duration = await this.getDuration(audio.src);

          this.showSongDetail(player, data);
        } catch {
        } finally {
          eventApp.removeLoading();
        }
        this.controlSong(audio);
      });
    });
  },
  async getSongData(address) {
    const response = await httpRequest.get(address);
    return response.data;
  },

  getDuration(src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(src);
      audio.preload = "metadata";
      audio.onloadeddata = () => {
        resolve(audio.duration);
      };

      audio.onerror = () => {
        reject("Không thể phát bài hát");
      };
    });
  },

  showSongDetail(element, data) {
    const thumb = element.querySelector(".middle-player img");
    const title = element.querySelector(".middle-player h3");

    const playerTimer = element.querySelector(".player-timer");
    const durationEl = playerTimer.lastElementChild;
    durationEl.innerText = format.timeTrack(this._duration);

    thumb.src = data.thumbnails;
    title = data.title;
  },

  controlSong(audio) {
    const progress = document.querySelector(".progress");
    const player = document.querySelector(".player");
    const leftPlayer = player.querySelector(".left-player");
    const playerControl = leftPlayer.querySelector(".player-control");
    const playBtn = playerControl.querySelector(".play-btn i");
    const playerTimer = leftPlayer.querySelector(".player-timer");
    let currentTimeEl = playerTimer.firstElementChild;
    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });
    audio.addEventListener("play", () => {
      playBtn.classList.replace("fa-play", "fa-pause");
    });
    audio.addEventListener("pause", () => {
      playBtn.classList.replace("fa-pause", "fa-play");
    });
    audio.addEventListener("timeupdate", (e) => {
      currentTimeEl.innerText = format.timeTrack(audio.currentTime);
      this._currentTime = format.timeTrack(audio.currentTime);
      let rate = (audio.currentTime / this._duration) * 100;
      progress.style.width = `${rate}%`;
    });
  },
};
