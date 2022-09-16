const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  trackId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    ref: "user",
  },
  playListId: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  trackName: {
    type: String,
    required: true,
  },
  albumArt: {
    type: String,
    required: true,
  },
  previewUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Track = mongoose.model("track", TrackSchema);
