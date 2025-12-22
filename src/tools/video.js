import { eventApp } from "./application";
import { format } from "./format";
import httpRequest from "./httpRequest";

function controlVideo() {
  let type = "/videos/details/";
  let player = null;
  let timeInterval = null;
  let currentTime = 0;
  let duration = 0;
  let lastSecond = -1;
  clearAnotherSound();
  playVideos();

  function getVideoYT(videoInfo) {
    const videoPlayer = document.querySelector("#videoPlayer");
    return onYouTubeIframeAPIReady(videoPlayer, videoInfo);
  }

  function onYouTubeIframeAPIReady(videoPlayer, videoInfo) {
    player = new YT.Player(videoPlayer, {
      videoId: videoInfo.videoId,
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    return player;
  }

  function onPlayerReady(event) {
    let player = event.target;
    player.playVideo();
    player.setVolume(10);
    const footerEl = document.querySelector(".js-footer-video");
    const playerEl = footerEl.querySelector(".player");
    const playerTimer = playerEl.querySelector(".player-timer");
    const durationEl = playerTimer.lastElementChild;
    durationEl.innerText = format.timeTrack(player.getDuration());
    duration = durationEl.innerText;
  }

  function onPlayerStateChange(event) {
    const videosEl = document.querySelector(".js-videos");
    const videoList = videosEl.querySelectorAll("li a");
    const footerEl = document.querySelector(".js-footer-video");
    const playerEl = footerEl.querySelector(".player");
    const playerTimer = playerEl.querySelector(".player-timer");
    const currentTimeEl = playerTimer.firstElementChild;
    const leftPlayer = playerEl.querySelector(".left-player");
    const playerControl = leftPlayer.querySelector(".player-control");
    const playBtn = playerControl.querySelector(".play-btn");
    const playIcon = playBtn.querySelector("i");
    if (event.data === 1) {
      startTrackingTime(currentTimeEl);
      playIcon.classList.replace("fa-play", "fa-pause");
    } else if (event.data === 2 || event.data === 3) {
      playIcon.classList.replace("fa-pause", "fa-play");
    } else if (event.data === 0) {
      currentTimeEl.innerText = format.timeTrack(player.getDuration());
      const rightPlayer = footerEl.querySelector(".right-player");
      const repeatBtn = rightPlayer.querySelector(".repeat-btn");
      const shuffleBtn = rightPlayer.querySelector(".shuffle-btn");
      if (shuffleBtn.classList.contains("active")) {
        const activeVideo = videosEl.querySelector(".active");
        const shuffleVideo =
          Math.floor(Math.random() * (videoList.length - 1)) + 1;
        handleVideo(playerEl, activeVideo, videoList[shuffleVideo]);
      }
      if (repeatBtn.classList.contains("active")) {
        const activeVideo = videosEl.querySelector(".active");
        handleVideo(playerEl, activeVideo, null);
      } else {
        const activeVideo = videosEl.querySelector(".active");
        const nextVideo = activeVideo.parentElement.nextElementSibling
          ? activeVideo.parentElement.nextElementSibling.querySelector("a")
          : videoList[0];
        handleVideo(playerEl, activeVideo, nextVideo);
      }
    } else {
      stopTrackingTime(timeInterval);
    }
    playBtn.onclick = () => {
      if (event.data === 1) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    };
    handleControl(event);
  }

  async function autoPlay(video) {
    const footerEl = document.querySelector(".js-footer-video");
    const playerEl = footerEl.querySelector(".player");
    const progress = footerEl.querySelector(".progress");
    progress.style.width = 0;
    const url = `${type}${video.dataset.videoId}`;
    const videoInfo = await getVideoData(url);

    showVideoDetail(playerEl, videoInfo);
    player = getVideoYT(videoInfo);
  }

  function playVideos() {
    const videosEl = document.querySelector(".js-videos");
    const videoList = videosEl.querySelectorAll("li a");
    const footerEl = document.querySelector(".js-footer-video");
    const playerEl = footerEl.querySelector(".player");

    videoList[0].classList.add("bg-white/20", "active");
    autoPlay(videoList[0]);
    videoList.forEach((video) => {
      video.addEventListener("click", async (e) => {
        e.stopPropagation();
        eventApp.showLoading();
        stopTrackingTime(timeInterval);
        player.destroy();
        const videoPlayer = document.createElement("div");
        videoPlayer.classList.add("w-full", "h-100");
        videoPlayer.id = "videoPlayer";
        const activeVideo = videosEl.querySelector(".active");
        const url = `${type}${video.dataset.videoId}`;
        const videoInfo = await getVideoData(url);
        showVideoDetail(playerEl, videoInfo);
        player = getVideoYT(videoInfo);
        activeVideo.classList.remove("bg-white/20", "active");
        video.classList.add("bg-white/20", "active");
        eventApp.removeLoading();
      });
    });
  }

  async function getVideoData(url) {
    const response = await httpRequest.get(url);
    return response.data;
  }

  function showVideoDetail(playerEl, videoInfo) {
    const thumb = playerEl.querySelector(".middle-player img");
    const title = playerEl.querySelector(".middle-player h3");

    thumb.src = videoInfo.thumbnails;
    title.innerText = videoInfo.title;
  }

  function startTrackingTime(currentTimeEl) {
    const footerEl = document.querySelector(".js-footer-video");
    const progress = footerEl.querySelector(".progress");

    timeInterval = setInterval(function () {
      currentTime = player.getCurrentTime();
      duration = player.getDuration();
      if (!timeInterval) {
        progress.style.width = "0%";
        clearInterval(timeInterval);
      }
      if (currentTime !== lastSecond) {
        currentTimeEl.innerText = format.timeTrack(currentTime);
      }
      lastSecond = currentTime;

      let rate = (currentTime / duration) * 100;
      progress.style.width = `${rate}%`;
      handleProgress();
    }, 100);
  }

  function stopTrackingTime() {
    const footerEl = document.querySelector(".js-footer-video");
    const progress = footerEl.querySelector(".progress");
    progress.style.width = "0%";
    clearInterval(timeInterval);
  }

  function handleProgress() {
    const footerEl = document.querySelector(".js-footer-video");
    const progressBar = footerEl.querySelector(".progress-bar");
    const playerEl = footerEl.querySelector(".player");
    const playerTimer = playerEl.querySelector(".player-timer");
    const currentTimeEl = playerTimer.firstElementChild;
    const progress = footerEl.querySelector(".progress");
    const progressSpan = progress.querySelector("span");
    //Lấy độ dài của progressBar
    const progressBarClientWidth = progressBar.clientWidth;
    let offsetX = 0;

    progressBar.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      offsetX = e.offsetX;
      let rate = (offsetX / progressBarClientWidth) * 100;
      progress.style.width = `${rate}%`;
      duration = player.getDuration();
      currentTime = (rate * duration) / 100;
      player.seekTo(currentTime, true);
      currentTimeEl.innerText = format.timeTrack(currentTime);
      document.addEventListener("mousemove", handleDrag);
    });

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleDrag);
      footerEl.classList.remove("select-none");
      footerEl.classList.remove("cursor-pointer");
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
      duration = player.getDuration();
      currentTime = (rate * duration) / 100;
      player.seekTo(currentTime, true);
    }
  }

  function handleControl() {
    const videosEl = document.querySelector(".js-videos");
    const videoList = videosEl.querySelectorAll("li a");
    const footerEl = document.querySelector(".js-footer-video");
    const playerEl = footerEl.querySelector(".player");
    //leftPlayer: Begin
    const leftPlayer = footerEl.querySelector(".left-player");
    const playerControl = leftPlayer.querySelector(".player-control");
    const nextBtn = playerControl.querySelector(".next-btn");
    const previousBtn = playerControl.querySelector(".previous-btn");

    nextBtn.onclick = async (e) => {
      e.stopPropagation();
      const activeVideo = videosEl.querySelector(".active");
      const nextVideo = activeVideo.parentElement.nextElementSibling
        ? activeVideo.parentElement.nextElementSibling.querySelector("a")
        : videoList[0];

      handleVideo(playerEl, activeVideo, nextVideo);
    };

    previousBtn.onclick = async (e) => {
      e.stopPropagation();
      const activeVideo = videosEl.querySelector(".active");
      const previousVideo = activeVideo.parentElement.previousElementSibling
        ? activeVideo.parentElement.previousElementSibling.querySelector("a")
        : videoList[videoList.length - 1];

      handleVideo(playerEl, activeVideo, previousVideo);
    };

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

      player.setVolume(volumeControl.value);

      if (volumeControl.value > 50) {
        volumeBtn.className = "volume-btn fa-solid fa-volume-high";
      }
      if (volumeControl.value > 0 && volumeControl.value <= 50) {
        volumeBtn.className = "volume-btn fa-solid fa-volume-low";
      }
      if (volumeControl.value === 0) {
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
    repeatBtn.onclick = (e) => {
      e.stopPropagation();
      if (shuffleBtn.classList.contains("active")) {
        shuffleBtn.classList.remove("active");
        shuffleIcon.classList.remove("text-blue-400");
      }

      repeatIcon.classList.toggle("text-blue-400");
      repeatBtn.classList.toggle("active");
    };

    shuffleBtn.onclick = (e) => {
      e.stopPropagation();
      if (repeatBtn.classList.contains("active")) {
        repeatBtn.classList.remove("active");
        repeatIcon.classList.remove("text-blue-400");
      }
      shuffleIcon.classList.toggle("text-blue-400");
      shuffleBtn.classList.toggle("active");
    };

    showActBtn.onclick = (e) => {
      e.stopPropagation();

      actGroup.classList.toggle("hidden");
      actGroup.classList.toggle("showAct");
    };
    //rightPlayer: End
  }

  async function handleVideo(playerEl, activeVideo, video) {
    let url = "";
    eventApp.showLoading();
    player.destroy();
    const videoPlayer = document.createElement("div");
    videoPlayer.classList.add("w-full", "h-100");
    videoPlayer.id = "videoPlayer";
    if (video) {
      url = `${type}${video.dataset.videoId}`;
      video.classList.add("bg-white/20", "active");
      activeVideo.classList.remove("bg-white/20", "active");
    } else {
      url = `${type}${activeVideo.dataset.videoId}`;
    }
    stopTrackingTime(timeInterval);
    const videoInfo = await getVideoData(url);
    showVideoDetail(playerEl, videoInfo);
    player = getVideoYT(videoInfo);
    eventApp.removeLoading();
  }
  function clearAnotherSound() {
    const audio = document.querySelector("audio");
    if (audio) {
      audio.src = "";
      audio.onloadeddata = "";
    }
  }
}

export default controlVideo;
