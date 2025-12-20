export const format = {
  timeDetails(duration) {
    const hour = Math.floor(duration / 3600);
    const minus = Math.floor((duration - hour * 3600) / 60);
    return `${hour < 10 ? "0" + hour : hour} giờ ${
      minus < 10 ? "0" + minus : minus
    } phút`;
  },

  timeTrack(duration) {
    const minus = Math.floor(duration / 60);
    const second = Math.floor(duration - minus * 60);
    return `${minus < 10 ? "0" + minus : minus}:${
      second < 10 ? "0" + second : second
    }`;
  },

  keyWord(str) {
    return str.replaceAll("%20", " ");
  },

  views(num) {
    if (num >= 1000000) {
      return `${Math.floor(num / 1000000)} Tr`;
    }

    if (num >= 1000) {
      return `${Math.floor(num / 1000)} N`;
    }

    return num;
  },
};
