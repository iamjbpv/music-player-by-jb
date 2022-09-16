const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const PlayList = require("../../models/PlayList");
const Track = require("../../models/Track");

const User = require("../../models/User");

router.get("/playlist/:username", async (req, res) => {
  // console.log(req.params);
  const { username } = req.params;
  try {
    const playlist = await PlayList.find({ username: username });

    res.json(playlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/tracks/:username", async (req, res) => {
  // console.log(req.params);
  const { username } = req.params;
  try {
    const track = await Track.find({ username: username });

    res.json(track);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/playlist", async (req, res) => {
  const { username, playlistName } = req.body;

  try {
    let user = await User.findOne({ username: username });

    if (!user) {
      const userFields = {
        username,
      };
      user = new User(userFields);
    }
    const newPlaylist = {
      username,
      name: playlistName,
    };
    playlist = new PlayList(newPlaylist);

    await user.save();
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/playlist", async (req, res) => {
  const { id, name } = req.body;

  try {
    let playlist = await PlayList.findOne({ _id: id });

    const result = await playlist.updateOne({ name: name });
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/playlist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await PlayList.deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/set-user", async (req, res) => {
  const { username } = req.body;
  console.log(req.body);

  try {
    let user;
    //build profile object
    const userFields = {};
    userFields.username = username;
    user = await User.findOne({ username: username });

    if (!user) {
      const userFields = {
        username,
      };
      user = new User(userFields);
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/playlist/add-track", async (req, res) => {
  const { playListIds, trackDetails } = req.body;
  playListIds.forEach(async (id) => {
    const newTrack = {
      trackId: trackDetails.trackId,
      username: "jebeekun",
      playListId: id,
      artistName: trackDetails.artistName,
      trackName: trackDetails.trackName,
      albumArt: trackDetails.albumArt,
      previewUrl: trackDetails.previewUrl,
    };
    let track = await Track.findOne({ trackId: trackDetails.trackId });

    if (!track) {
      try {
        let track;
        //Create
        track = new Track(newTrack);

        await track.save();
        // res.json(playlist);
      } catch (err) {
        console.log(err.message);
        // res.status(500).send("Server Error");
      }
    }
  });
  // const playlist = await PlayList.find({ playListId: playListId });

  res.json("success");
});

router.get(
  "/playlist/:playListId/tracks/:sortByArtistName/:sortByTrackName",
  async (req, res) => {
    const { playListId, sortByArtistName, sortByTrackName } = req.params;
    let mysort = {};
    if (sortByTrackName != 0) {
      mysort = {
        ...mysort,
        trackName: sortByTrackName,
      };
    }
    if (sortByArtistName != 0) {
      mysort = {
        ...mysort,
        artistName: sortByArtistName,
      };
    }
    try {
      const track = await Track.find({ playListId: playListId }).sort(mysort);

      res.json(track);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/tracks/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const result = await Track.deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
