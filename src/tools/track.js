import { eventApp } from "./application";
import { format } from "./format";
import httpRequest from "./httpRequest";

export const track = {
  _type: "/songs/details/",
  init() {
    this.playTrack();
    this.handleControl();
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
    const playerEl = footerEl.querySelector(".js-player");
    const trackInfoEl = document.querySelector(".js-track-info");

    trackList.forEach((track) => {
      track.addEventListener("click", async (e) => {
        e.stopPropagation();
        const activeTrack = tracksEl.querySelector(".active");
        const url = `${this._type}${track.dataset.trackId}`;
        eventApp.showLoading();
        const trackInfo = await this.getTrackData(url);
        this.handleAudio(playerEl, trackInfo);
        this.showTrackInfo(trackInfoEl, trackInfo);
        track.classList.add("bg-white/20", "active");
        activeTrack.classList.remove("bg-white/20", "active");
        eventApp.removeLoading();
        document.addEventListener("keydown", this.playAudio);
      });
    });
  },

  handleAudio(playerEl, trackInfo) {
    const tracksEl = document.querySelector(".js-tracks");
    const trackList = tracksEl.querySelectorAll("li a");
    const progress = document.querySelector(".progress");
    const audio = document.querySelector("audio");
    const leftPlayer = playerEl.querySelector(".left-player");
    const playerTimer = leftPlayer.querySelector(".player-timer");
    const playerControl = leftPlayer.querySelector(".player-control");
    const playBtn = playerControl.querySelector(".play-btn i");
    const volumeControl = document.querySelector(".volume-control");

    audio.src = trackInfo.audioUrl;
    audio.preload = "metadata";
    progress.style.width = 0;
    audio.addEventListener("canplay", (e) => {
      this.showTrackDetail(playerEl, trackInfo, audio.duration);
      audio.play();
      audio.volume = volumeControl.defaultValue / 100;
      document.addEventListener("keydown", this.playAudio);
      audio.addEventListener("play", () => {
        playBtn.classList.replace("fa-play", "fa-pause");
      });
      audio.addEventListener("pause", () => {
        playBtn.classList.replace("fa-pause", "fa-play");
      });

      audio.addEventListener("timeupdate", () => {
        let currentTimeEl = playerTimer.firstElementChild;
        currentTimeEl.innerText = format.timeTrack(audio.currentTime);
        let rate = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${rate}%`;
      });

      this.handleProgress(audio, audio.duration);
    });
    audio.onended = () => {
      const repeatBtn = playerEl.querySelector(".repeat-btn");
      const shuffleBtn = playerEl.querySelector(".shuffle-btn");

      if (
        !repeatBtn.classList.contains("active") &&
        !shuffleBtn.classList.contains("active")
      ) {
        const activeTrack = tracksEl.querySelector(".active");
        const nextTrack = activeTrack.parentElement.nextElementSibling
          ? activeTrack.parentElement.nextElementSibling.querySelector("a")
          : null;
        if (nextTrack) {
          this.handlePlay(playerEl, activeTrack, nextTrack);
        } else {
          this.handlePlay(playerEl, activeTrack, trackList[0]);
        }
      }
    };
    document.addEventListener("mousedown", () => {
      document.removeEventListener("keydown", this.playAudio);
    });
  },

  playAudio(e) {
    const audio = document.querySelector("audio");
    e.preventDefault();
    if (e.key === " ") {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
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

    progress.addEventListener("mouseup", () => {
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

      if (rate < 0) {
        rate = 0;
      }
      if (rate > 100) {
        rate = 100;
      }
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

  handleControl() {
    const audio = document.querySelector("audio");
    const tracksEl = document.querySelector(".js-tracks");
    const trackList = tracksEl.querySelectorAll("li a");
    const footerEl = document.querySelector(".js-footer");
    const playerEl = footerEl.querySelector(".player");

    //leftPlayer: Begin
    const leftPlayer = footerEl.querySelector(".left-player");
    const playerControl = leftPlayer.querySelector(".player-control");
    const nextBtn = playerControl.querySelector(".next-btn");
    const previousBtn = playerControl.querySelector(".previous-btn");
    const playBtn = playerControl.querySelector(".play-btn");

    playBtn.onclick = () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    };
    nextBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const activeTrack = tracksEl.querySelector(".active");
      const nextTrack = activeTrack.parentElement.nextElementSibling
        ? activeTrack.parentElement.nextElementSibling.querySelector("a")
        : trackList[0];
      this.handlePlay(playerEl, activeTrack, nextTrack);
    });

    previousBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const activeTrack = tracksEl.querySelector(".active");
      const previousTrack = activeTrack.parentElement.previousElementSibling
        ? activeTrack.parentElement.previousElementSibling.querySelector("a")
        : trackList[trackList.length - 1];
      this.handlePlay(playerEl, activeTrack, previousTrack);
    });
    //leftPlayer: End
    //=========================================
    //rightPlayer: Begin
    const rightPlayer = footerEl.querySelector(".right-player");
    const actGroup = rightPlayer.firstElementChild;
    const group = rightPlayer.querySelector(".group").firstElementChild;
    const volumeGroup = rightPlayer.querySelector(".volume-group");
    const volumeControl = volumeGroup.querySelector(".volume-control");
    const volumeBtn = volumeGroup.querySelector(".volume-btn");
    const repeatBtn = rightPlayer.querySelector(".repeat-btn");
    const repeatIcon = repeatBtn.querySelector("i");
    const shuffleBtn = rightPlayer.querySelector(".shuffle-btn");
    const shuffleIcon = shuffleBtn.querySelector("i");
    const showActBtn = footerEl.querySelector(".show-act-btn");
    volumeControl.addEventListener("input", (e) => {
      e.stopPropagation();
      audio.volume = volumeControl.value / 100;
      if (audio.volume > 0.5) {
        volumeBtn.className = "volume-btn fa-solid fa-volume-high";
      }
      if (audio.volume > 0 && audio.volume <= 0.5) {
        volumeBtn.className = "volume-btn fa-solid fa-volume-low";
      }
      if (audio.volume === 0) {
        volumeBtn.className = "volume-btn fa-solid fa-volume-xmark";
      }
    });
    volumeBtn.onclick = (e) => {
      e.stopPropagation();
      group.classList.toggle("visible");
      group.classList.toggle("invisible");
      group.classList.toggle("opacity-100");
      group.classList.toggle("opacity-0");
    };
    repeatBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (shuffleBtn.classList.contains("active")) {
        shuffleBtn.classList.remove("active");
        shuffleIcon.classList.remove("text-blue-400");
      }

      repeatIcon.classList.toggle("text-blue-400");
      repeatBtn.classList.toggle("active");

      audio.addEventListener("ended", () => {
        if (repeatBtn.classList.contains("active")) {
          const activeTrack = tracksEl.querySelector(".active");
          this.handlePlay(playerEl, activeTrack, null);
        } else {
          audio.pause();
        }
      });
    });

    shuffleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (repeatBtn.classList.contains("active")) {
        repeatBtn.classList.remove("active");
        repeatIcon.classList.remove("text-blue-400");
      }

      shuffleIcon.classList.toggle("text-blue-400");
      shuffleBtn.classList.toggle("active");
      audio.addEventListener("ended", () => {
        if (shuffleBtn.classList.contains("active")) {
          const activeTrack = tracksEl.querySelector(".active");
          const shuffleTrack =
            Math.floor(Math.random() * (trackList.length - 1)) + 1;
          this.handlePlay(playerEl, activeTrack, trackList[shuffleTrack]);
        } else {
          audio.pause();
        }
      });
    });
    showActBtn.onclick = (e) => {
      e.stopPropagation();

      actGroup.classList.toggle("hidden");
      actGroup.classList.toggle("showAct");
    };
    //rightPlayer: End
  },

  async handlePlay(playerEl, activeTrack, trackEl) {
    eventApp.showLoading();
    let url = "";
    if (trackEl) {
      url = `${this._type}${trackEl.dataset.trackId}`;
      trackEl.classList.add("bg-white/20", "active");
      activeTrack.classList.remove("bg-white/20", "active");
    } else {
      url = `${this._type}${activeTrack.dataset.trackId}`;
    }
    const trackInfoEl = document.querySelector(".js-track-info");
    const trackInfo = await this.getTrackData(url);

    this.handleAudio(playerEl, trackInfo);
    this.showTrackInfo(trackInfoEl, trackInfo);
    eventApp.removeLoading(300);
  },
};
