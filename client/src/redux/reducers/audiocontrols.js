import {
  SET_CONTROL,
  SET_TRACK,
  SET_AUDIO,
  SET_VOLUME,
} from "../actions/types";

const DEFAULT_CONTROL_STATE = {
  audioObject: new Audio(""),
  playing: false,
  previewUrl:
    "https://p.scdn.co/mp3-preview/a887360f6897298991dd402161835e86480fd9c5?cid=9f6f59eb49a544fda5e4d36f1c2788f7",
  albumArt: "https://i.scdn.co/image/ab67616d0000b273dd8408b50f45c66139f44ce2",
  artistName: "The Script",
  trackName: "Hall of Fame (feat. will.i.am)",
  volume: 0.5,
};

const audiocontrols = (state = DEFAULT_CONTROL_STATE, action) => {
  console.log("action", action);
  switch (action.type) {
    case SET_CONTROL:
      return { ...state, playing: action.playing };
    case SET_TRACK:
      return {
        ...state,
        playing: action.playing,
        previewUrl: action.previewUrl,
        albumArt: action.albumArt,
        artistName: action.artistName,
        trackName: action.trackName,
      };
    case SET_AUDIO:
      return { ...state, audio: action.audio };
    case SET_VOLUME:
      return { ...state, volume: action.volume };
    default:
      return state;
  }
};

export default audiocontrols;
