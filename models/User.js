const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  playlists: [
    {
      playListId: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      // tracks: [
      //   {
      //     id: {
      //       type: String,
      //       required: true,
      //     },
      //     artistName: {
      //       type: String,
      //       required: true,
      //     },
      //     trackName: {
      //       type: String,
      //       required: true,
      //     },
      //     albumArt: {
      //       type: String,
      //       required: true,
      //     },
      //     previewUrl: {
      //       type: String,
      //       required: true,
      //     },
      //   },
      // ],
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
