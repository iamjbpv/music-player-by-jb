import { SET_CONTROL, SET_TRACK, SET_AUDIO, SET_VOLUME } from "./types";

export const setPlaying = (status) => async (dispatch) => {
  dispatch({
    type: SET_CONTROL,
    playing: status,
  });
};

export const setTrack = (trackInfo) => async (dispatch) => {
  if (!trackInfo.customFormat) {
    dispatch({
      type: SET_TRACK,
      playing: true,
      previewUrl: trackInfo.preview_url,
      albumArt: trackInfo.album.images[0].url,
      artistName: trackInfo.artists[0].name,
      trackName: trackInfo.name,
    });
  } else {
    dispatch({
      type: SET_TRACK,
      playing: true,
      previewUrl: trackInfo.previewUrl,
      albumArt: trackInfo.albumArt,
      artistName: trackInfo.artistName,
      trackName: trackInfo.trackName,
    });
  }
};

export const setTrack2 = (trackInfo) => async (dispatch) => {
  dispatch({
    type: SET_TRACK,
    playing: true,
    previewUrl: trackInfo.previewUrl,
    albumArt: trackInfo.albumArt,
    artistName: trackInfo.artistName,
    trackName: trackInfo.trackName,
  });
};

export const setAudio = (audio) => {
  return { type: SET_AUDIO, audio: audio };
};

export const setVolume = (volume) => {
  return { type: SET_VOLUME, volume: volume };
};

// export const setAlbumArt = (albumArt) => {
//     return { type: SET_ALBUM_ART, albumArt: albumArt };
// }

// export const setArtist = (artistName) => {
//     return { type: SET_ARTIST, artistName: artistName };
// }
