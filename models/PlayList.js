const mongoose = require("mongoose");

const PlayListSchema = new mongoose.Schema({
  username: {
    type: String,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = PlayList = mongoose.model("playlist", PlayListSchema);
